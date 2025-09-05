import { motion } from "framer-motion"

import AskSloan from "@/components/AskSolon"
interface CourseInterface {
  image: string
  title: string
  author: string
  currentLesson: number
  totalLessons: number
  descriptions: string
}

const courses: Array<CourseInterface> = [
  {
    image: "/Imagessssssssss.svg",
    title: "Course 1",
    author: "Thomas Wake",
    currentLesson: 120,
    totalLessons: 22,
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. A arcu elit tempus nulla et vitae vitae ullamcorper. Congue amet orci vitae ut sociis. Ut odio scelerisque tincidunt commodo amet platea proin et sit.",
  },
  {
    image: "/Imagessssssssss.svg",
    title: "Course 2",
    author: "Thomas Wake",
    currentLesson: 120,
    totalLessons: 22,
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. A arcu elit tempus nulla et vitae vitae ullamcorper. Congue amet orci vitae ut sociis. Ut odio scelerisque tincidunt commodo amet platea proin et sit.",
  },
  {
    image: "/Imagessssssssss.svg",
    title: "Course 3",
    author: "Thomas Wake",
    currentLesson: 120,
    totalLessons: 22,
    descriptions:
      "Lorem ipsum dolor sit amet consectetur. A arcu elit tempus nulla et vitae vitae ullamcorper. Congue amet orci vitae ut sociis. Ut odio scelerisque tincidunt commodo amet platea proin et sit.",
  },
]

const AllCourses = () => {
  return (
    <motion.div className="w-full h-auto ">
      <div className="w-full flex md:items-center justify-between flex-col md:flex-row gap-5">
        <p className="text-[28px] font-medium text-start">All Courses</p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <button className=" flex p-3 gap-2 text-pinkMilkish border rounded-md border-pinkMilkish hover:opacity-70 duration-250 whitespace-nowrap sm:w-1/2 md:w-auto">
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
            Complete Courses:
            <span>4</span>
          </button>
          <button className=" flex p-3 gap-2 text-pinkMilkish border rounded-md border-pinkMilkish hover:opacity-70 duration-250 whitespace-nowrap  sm:w-1/2 md:w-auto">
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.5 22C7.493 22 5.49 22 4.245 20.535C3 19.072 3 16.714 3 12C3 7.286 3 4.929 4.245 3.464C5.49 1.999 7.493 2 11.5 2C15.507 2 17.51 2 18.755 3.464C19.757 4.644 19.953 6.401 19.991 9.5M8 8H15M8 13H11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
              <path
                d="M19.6106 18.105C20.1871 17.6859 20.6162 17.0951 20.8363 16.4173C21.0564 15.7394 21.0562 15.0092 20.8359 14.3314C20.6155 13.6536 20.1862 13.063 19.6095 12.6442C19.0328 12.2254 18.3384 11.9999 17.6256 12H17.3746C16.662 12.0001 15.9677 12.2257 15.3911 12.6446C14.8146 13.0635 14.3855 13.6541 14.1652 14.3319C13.945 15.0096 13.9449 15.7397 14.165 16.4175C14.3852 17.0953 14.8142 17.686 15.3906 18.105M15.3906 18.105C15.9668 18.5251 16.6616 18.751 17.3746 18.75H17.6246C18.3376 18.751 19.0325 18.5251 19.6086 18.105L20.1916 19.94C20.4136 20.64 20.5256 20.99 20.4946 21.208C20.4316 21.662 20.0616 21.998 19.6246 22C19.4146 22 19.1006 21.836 18.4716 21.506C18.2016 21.364 18.0676 21.294 17.9296 21.252C17.6491 21.1681 17.3502 21.1681 17.0696 21.252C16.9316 21.294 16.7966 21.364 16.5276 21.506C15.8986 21.836 15.5846 22.001 15.3746 22C14.9376 21.998 14.5676 21.662 14.5046 21.208C14.4746 20.99 14.5846 20.64 14.8076 19.94L15.3906 18.105Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
            Certificates Received:
            <span>4</span>
          </button>
        </div>
      </div>
      <motion.div className=" w-full h-auto  grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 my-5">
        {courses.map((course, idx) => {
          return <CourseCard key={`${course.author}-${idx}`} course={course} />
        })}
      </motion.div>
      <AskSloan className="w-full" variant="light" />
    </motion.div>
  )
}

const CourseCard = ({ course }: Readonly<{ course: CourseInterface }>) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="border border-grayBorder bg-white rounded-2xl p-5 flex flex-col gap-4 "
      exit={{ opacity: 0, scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.img
        alt={course.image}
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0.95, opacity: 0 }}
        src={"/Imagessssssssss.svg"}
        transition={{ delay: 0.1, duration: 0.4 }}
      />
      <p className="font-medium text-lg">{course.title}</p>
      <p className="text-sm">
        <span className="text-grayuserText">by</span> {course.author}
      </p>
      <p
        className="bg-graySkeleton py-1 px-2 rounded text-xs text-blackDarkGray
              "
      >
        {course.currentLesson} Lessons
        <span className="text-grayuserText"> | 0 of {course.totalLessons} Lessons Completed</span>
      </p>
      <p className="text-sm font-normal">{course.descriptions}</p>
      <button className="rounded bg-pinkMilkish w-full text-white whitespace-nowrap py-3 px-4 text-sm hover:opacity-70 duration-300">
        Take Course
      </button>
    </motion.div>
  )
}

export default AllCourses
