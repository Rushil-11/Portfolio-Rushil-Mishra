/**
 * Live Competitive Programming API Fetchers
 * Direct real-time fetching without stale caching (cache: "no-store")
 */

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/html, */*",
};

// 1. LeetCode (Direct Official GraphQL with public API fallback)
export async function fetchLeetCode(username: string = "Rushil_211") {
  // Strategy 1: Official LeetCode GraphQL API (Direct & reliable, no 429 rate limit)
  try {
    const query = `
      query getUserProfile($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          attended
          rating
        }
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...BROWSER_HEADERS,
        Referer: `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok) {
      const data = await res.json();
      const contestRanking = data?.data?.userContestRanking;
      const contestHistoryRaw = data?.data?.userContestRankingHistory;
      const acList = data?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];

      let totalSolved = 0;
      let easySolved = 0;
      let mediumSolved = 0;
      let hardSolved = 0;

      for (const item of acList) {
        if (item.difficulty === "All") totalSolved = item.count;
        if (item.difficulty === "Easy") easySolved = item.count;
        if (item.difficulty === "Medium") mediumSolved = item.count;
        if (item.difficulty === "Hard") hardSolved = item.count;
      }

      const contestHistory: number[] = Array.isArray(contestHistoryRaw)
        ? contestHistoryRaw
            .filter((c: { attended: boolean; rating?: number }) => c.attended && typeof c.rating === "number")
            .map((c: { rating: number }) => Math.round(c.rating))
        : [];

      const currentRating = contestRanking?.rating
        ? Math.round(contestRanking.rating)
        : contestHistory.length > 0
        ? contestHistory[contestHistory.length - 1]
        : 0;

      const maxRated = contestHistory.length > 0 ? Math.max(...contestHistory) : currentRating;

      return {
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        rating: currentRating,
        maxRating: maxRated,
        ratings: contestHistory,
        ranking: contestRanking?.topPercentage
          ? `Top ${Math.round(contestRanking.topPercentage)}%`
          : "Active",
      };
    }
  } catch (error) {
    console.warn("Direct LeetCode GraphQL fetch failed, trying fallback:", error);
  }

  // Strategy 2: Fallback to alfa-leetcode-api
  try {
    const [profileRes, contestRes] = await Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
        headers: BROWSER_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
        headers: BROWSER_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      }),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const contest = contestRes.ok ? await contestRes.json() : null;

    const contestHistory: number[] =
      Array.isArray(contest?.contestParticipation) && contest.contestParticipation.length > 0
        ? contest.contestParticipation
            .filter((c: { attended?: boolean; rating?: number }) => c.attended !== false && typeof c.rating === "number")
            .map((c: { rating: number }) => Math.round(c.rating))
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
      ranking: contest?.contestTopPercentage
        ? `Top ${Math.round(contest.contestTopPercentage)}%`
        : "Active",
    };
  } catch (error) {
    console.error("Failed to fetch LeetCode data:", error);
    return null;
  }
}

// 2. Codeforces (Official API with standard User-Agent headers)
export async function fetchCodeforces(handle: string = "Rushil_211") {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
        headers: BROWSER_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      }),
      fetch(`https://codeforces.com/api/user.rating?handle=${handle}`, {
        headers: BROWSER_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      }),
      fetch(`https://codeforces.com/api/user.status?handle=${handle}`, {
        headers: BROWSER_HEADERS,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      }),
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

// 3. CodeChef (Direct scrape with resilient multi-selector parsing)
export async function fetchCodeChef(handle: string = "rushil_211") {
  try {
    const res = await fetch(`https://www.codechef.com/users/${handle}`, {
      headers: BROWSER_HEADERS,
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error("CodeChef fetch failed");
    const html = await res.text();

    // Parse ratings history first from the embedded script variable
    let ratingsHistory: number[] = [];
    const allRatingsMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/);
    if (allRatingsMatch) {
      try {
        const parsed = JSON.parse(allRatingsMatch[1]);
        ratingsHistory = parsed
          .map((item: { rating: string | number }) => Number(item.rating))
          .filter((n: number) => !isNaN(n));
      } catch {
        ratingsHistory = [];
      }
    }

    // Rating number: match div content or fall back to last rating in history
    const ratingMatch =
      html.match(/class=["']rating-number["'][^>]*>([\s\S]*?)<\/div>/i) ||
      html.match(/rating-number">([\s\S]*?)</);
    let rating = ratingMatch ? parseInt(ratingMatch[1].trim(), 10) : 0;
    if ((isNaN(rating) || rating === 0) && ratingsHistory.length > 0) {
      rating = ratingsHistory[ratingsHistory.length - 1];
    }

    // Contests count
    const contestsMatch =
      html.match(/Contests\s*\(([\d]+)\)/i) ||
      html.match(/contests\s*:\s*(\d+)/i);
    let contests = contestsMatch ? parseInt(contestsMatch[1], 10) : 0;
    if ((isNaN(contests) || contests === 0) && ratingsHistory.length > 0) {
      contests = ratingsHistory.length;
    }

    // Attempted / Solved count
    const attemptedMatch =
      html.match(/Fully Solved\s*\(([\d]+)\)/i) ||
      html.match(/Total Problems Solved:\s*(\d+)/i) ||
      html.match(/Problems Solved[\s\S]*?>(\d+)</i);
    const attempted = attemptedMatch ? parseInt(attemptedMatch[1], 10) : 0;

    // Stars rating tier inside .rating-star container
    const starContainer = html.match(/class=["']rating-star["'][^>]*>([\s\S]*?)<\/div>/i);
    const starMatches = starContainer
      ? starContainer[1].match(/&#9733;/g) || starContainer[1].match(/★/g)
      : null;
    const starCount = starMatches ? starMatches.length : rating >= 1400 ? 2 : 1;
    const stars = `${starCount}★`;

    const maxRatingVal =
      ratingsHistory.length > 0 ? Math.max(...ratingsHistory, rating) : rating;

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
