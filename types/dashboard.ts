import { ICourseBatch, ICourseBatchSession, NewCourseBatchSession } from './courseBatch'
import { IExamTracker } from './exam'
import { PaginatedResult } from './pagination'
import { IUser } from './user'

export interface TeacherDashboardData {
 totalCourses: number
 totalBatches: number
 totalStudents: number
 totalSessions: number
 totalEarnings: number
 totalRatings: number
 recentlyJoinedStudents: any[]
 recentBatches: any[]
}
export interface TeacherDashboardResponse {
 data: TeacherDashboardData
}

export interface ScoreTimeline {
 score: number
 date: Date
}

export interface Leaderboard {
 user: IUser
 score: number
}

export interface AttendanceStat {
 present: number
 absent: number
}
export interface StudentDashboardResponse {
 data: StudentDashboardData
}

export interface StudentDashboardData {
 score: number
 attendance: AttendanceStat
 exam: {
  totalExams: number
  totalExamsCompleted: number
 }
 scoreTimeline: ScoreTimeline[]
 sessions: ICourseBatchSession[]
 exams: IExamTracker[]
 leaderboard: Leaderboard[]
}

export interface StudentDashbaordResponse {
 members: PaginatedResult<IUser>
 sessions: PaginatedResult<ICourseBatchSession>
 batch: ICourseBatch
}
