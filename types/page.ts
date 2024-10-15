import { Schema } from 'mongoose'
import { Bootcamp } from './bootcamp'
import { Client } from './client'
import { Image } from './common'
import { Course, MasterClass } from './course'
import { ProjectDetail } from './projectDetail'
import { SEOHead } from './seoHead'
import { Testimonial } from './testimonial'
import { ToolsTechnologies } from './toolsTechnologies'

export enum PageType {
 LANDING = 'LANDING',
 COURSES = 'COURSES',
 COURSE = 'COURSE',
 BOOTCAMP = 'BOOTCAMP',
 BOOTCAMPS = 'BOOTCAMPS',
 REFER_AND_EARN = 'REFER_AND_EARN',
 HIRE_FROM_US = 'HIRE_FROM_US',
 FAQ = 'FAQ',
 HELP = 'HELP',
 CONTACT_US = 'CONTACT_US',
 TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
 REFUND_CANCELATION_POLICY = 'REFUND_CANCELATION_POLICY',
 PRIVACY_POLICY = 'PRIVACY_POLICY',
 TERMS_AND_POLICY = 'TERMS_AND_POLICY'
}

export type Banner = {
 title: string
 description: string
 image: Image
 mobileImage: Image
 ctaText: string
 link: string
}

export type BannerType<T extends string> = {
 [key in T]: Banner
}

export type Stat = {
 icon: Image
 stat: string
 description: string
}

export type PageStat<T extends string> = {
 [key in T]: Stat[]
}

export type PageContent = {
 pageName?: PageType
 banners?: Banner[]
 courses?: Course[]
 bootcamps?: Bootcamp[]
 testimonials?: Testimonial[]
 stats?: Stat[]
 instructors?: Schema.Types.ObjectId[]
 projectDetails?: ProjectDetail[]
 toolsTechnologies?: ToolsTechnologies[]
 masterClasses?: MasterClass[]
 clients?: Client[]
 seoHead?: SEOHead
}

export type PageContents = {
 [key in PageType]: PageContent
}
