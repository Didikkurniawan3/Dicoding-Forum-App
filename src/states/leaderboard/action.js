import { hideLoading, showLoading } from "react-redux-loading-bar"

import { leaderboardAPI } from "../../api/leaderboard"

export const leaderboardActionType = {
    SET: 'leaderboard/set',
}

export const leaderboardActions = {
    set(leaderboard) {
        return {
            type: leaderboardActionType.SET,
            payload: { leaderboard },
        }
    },
}

export const leaderboardThunks = {
    asyncSetLeaderboard() {
        return async (dispatch) => {
            dispatch(showLoading())
            try {
                const { status, message, leaderboards } = await leaderboardAPI.getLeaderboard()
                if (status === 'fail') {
                    throw new Error(message)
                }
                dispatch(leaderboardActions.set(leaderboards))
            } catch (error) {
                console.error("Error fetching leaderboard:", error)
            } finally {
                dispatch(hideLoading()) // Pindahkan ke `finally` agar selalu dipanggil
            }
        }
    },
}
