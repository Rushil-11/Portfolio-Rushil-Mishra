/**
 * Live Competitive Programming API Fetchers
 * Direct real-time fetching without stale caching (cache: "no-store")
 */

// 1. LeetCode
export async function fetchLeetCode(username: string = "Rushil_211") {
  try {
    const [profileRes, contestRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { cache: "no-store" }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, { cache: "no-store" }),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const contest = contestRes.ok ? await contestRes.json() : null;

    const contestHistory: number[] =
      Array.isArray(contest?.contestParticipation) && contest.contestParticipation.length > 0
        ? contest.contestParticipation.map((c: { rating: number }) => Math.round(c.rating))
        : [];

    const currentRating = contest?.contestRating
      ? Math.round(contest.contestRating)
      : contestHistory.length > 0
      ? contestHistory[contestHistory.length - 1]
      : 0;

    const maxRated = contestHistory.length > 0 ? Math.max(...contestHistory) : currentRating;

    return {
      totalSolved: profile?.totalSolved ?? 0,
      easySolved: profile?.easySolved ?? 0,
      mediumSolved: profile?.mediumSolved ?? 0,
      hardSolved: profile?.hardSolved ?? 0,
      rating: currentRating,
      maxRating: maxRated,
      ratings: contestHistory,
      ranking: contest?.contestTopPercentage ? `Top ${contest.contestTopPercentage.toFixed(0)}%` : "Active",
    };
  } catch (error) {
    console.error("Failed to fetch LeetCode data:", error);
    return null;
  }
}

// 2. Codeforces (Official API)
export async function fetchCodeforces(handle: string = "Rushil_211") {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, { cache: "no-store" }),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, { cache: "no-store" }),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`, { cache: "no-store" }),
    ]);

    const info = infoRes.ok ? await infoRes.json() : null;
    const rating = ratingRes.ok ? await ratingRes.json() : null;
    const status = statusRes.ok ? await statusRes.json() : null;

    const user = info?.result?.[0];
    const ratingVal = user?.rating ?? 0;
    const maxRatingVal = user?.maxRating ?? ratingVal;
    const rankTier = user?.rank ?? "newbie";

    const contests = Array.isArray(rating?.result) ? rating.result.length : 0;
    const attempted = Array.isArray(status?.result)
      ? new Set(
          status.result
            .map((s: { problem?: { name?: string } }) => s.problem?.name)
            .filter(Boolean)
        ).size
      : 0;

    const ratingsHistory: number[] =
      Array.isArray(rating?.result) && rating.result.length > 0
        ? rating.result.map((c: { newRating: number }) => c.newRating)
        : [];

    return {
      rating: ratingVal,
      maxRating: maxRatingVal,
      ranking: rankTier,
      contests,
      attempted,
      ratings: ratingsHistory,
    };
  } catch (error) {
    console.error("Failed to fetch Codeforces data:", error);
    return null;
  }
}

// 3. CodeChef
export async function fetchCodeChef(handle: string = "rushil_211") {
  try {
    const res = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("CodeChef fetch failed");
    const html = await res.text();

    const ratingMatch = html.match(/rating-number">(\d+)/);
    const rating = ratingMatch ? Number(ratingMatch[1]) : 0;

    const contestsMatch = html.match(/contests\s*:\s*(\d+)/i) || html.match(/Contests \(([\d]+)\)/);
    const contests = contestsMatch ? Number(contestsMatch[1]) : 0;

    const attemptedMatch = html.match(/Total Problems Solved:\s*(\d+)/i) || html.match(/Fully Solved \((\d+)\)/);
    const attempted = attemptedMatch ? Number(attemptedMatch[1]) : 0;

    const starsMatch = html.match(/rating-star">([^<]+)/);
    const stars = starsMatch ? starsMatch[1].trim() : "2★";

    let ratingsHistory: number[] = [];
    const allRatingsMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/);
    if (allRatingsMatch) {
      try {
        const parsed = JSON.parse(allRatingsMatch[1]);
        ratingsHistory = parsed
          .map((item: { rating: string }) => Number(item.rating))
          .filter((n: number) => !isNaN(n));
      } catch {
        ratingsHistory = [];
      }
    }

    const maxRatingVal = ratingsHistory.length > 0 ? Math.max(...ratingsHistory) : rating;

    return {
      rating,
      maxRating: maxRatingVal,
      ranking: stars,
      contests,
      attempted,
      ratings: ratingsHistory,
    };
  } catch (error) {
    console.error("Failed to fetch CodeChef data:", error);
    return null;
  }
}
