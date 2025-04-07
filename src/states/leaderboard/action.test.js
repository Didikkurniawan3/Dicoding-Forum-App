/**
 *  Test Scenario
 * 
 * ~ leaderboardThunks.asyncSetLeaderboard
    * - should dispatch action correctly when data fetching success
    * - should dispatch action correctly and trow Error when data fetching fails
*/

import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { leaderboardAPI } from '../../api/leaderboard'
import { generateLeaderboard } from '../../utils/testUtils'
import { leaderboardActions, leaderboardThunks } from './action'

const fakeLeaderboardResponseSuccess = {
    "leaderboards": Array.from({ length: 10 }, () => generateLeaderboard()),
    "status": "success",
    "message": "ok"
}

const fakeLeaderboardResponseFailed = {
    "leaderboards": [],
    "status": "failed",
    "message": "Ups, something went wrong"
}

describe("leaderboardThunks.asyncSetLeaderboard", () => {
    beforeEach(() => {
        leaderboardAPI._getLeaderboard = leaderboardAPI.getLeaderboard
    })
    afterEach(() => {
        leaderboardAPI.getLeaderboard = leaderboardAPI._getLeaderboard
        delete leaderboardAPI._getLeaderboard
    })

    it("should dispatch actions correctly when data fetching succeeds", async () => {
        leaderboardAPI.getLeaderboard = () => Promise.resolve(fakeLeaderboardResponseSuccess)

        const dispatch = vi.fn()

        await leaderboardThunks.asyncSetLeaderboard()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(showLoading())
        expect(dispatch).toHaveBeenCalledWith(leaderboardActions.set(fakeLeaderboardResponseSuccess.leaderboards))
        expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })

    it("should dispatch actions correctly and still hide loading when data fetching fails", async () => {
        leaderboardAPI.getLeaderboard = () => Promise.reject(new Error(fakeLeaderboardResponseFailed.message))
      
        const dispatch = vi.fn()
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
        await leaderboardThunks.asyncSetLeaderboard()(dispatch)
      
        expect(dispatch).toHaveBeenCalledWith(showLoading())
        expect(dispatch).not.toHaveBeenCalledWith(leaderboardActions.set(fakeLeaderboardResponseSuccess.leaderboards))
        expect(dispatch).toHaveBeenCalledWith(hideLoading())
      
        consoleSpy.mockRestore()
      })
      
})
