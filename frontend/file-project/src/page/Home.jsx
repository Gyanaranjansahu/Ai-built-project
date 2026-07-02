
import { useEffect } from 'react'
import useauth from '../authentication/hookcontroll'
import "../style/home.css";
import {motion} from "framer-motion"
const Home = () => {
  let {loading,handleLogout}=useauth()

  async function out(){
    let data=await handleLogout()
  }

  return (
  <div className="container">
      {/* Animated Card */}
      <motion.div
        className="form-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading */}
        <motion.h1
          className="title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Interview Report Generator
        </motion.h1>

        <p className="subtitle">
          Upload your resume and provide details
          to generate your interview report.
        </p>

        <div className="form-group">
          {/* Job Description */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="input-wrapper"
          >
            <label>Job Description</label>

            <textarea
              placeholder="Paste the job description here..."
              className="input-box textarea"
            />
          </motion.div>

          {/* Resume Upload */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="input-wrapper"
          >
            <label>Upload Resume (PDF)</label>

            <input
              type="file"
              accept=".pdf"
              className="file-input"
            />
          </motion.div>

          {/* Self Description */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="input-wrapper"
          >
            <label>Self Description</label>

            <textarea
              placeholder="Tell us about yourself..."
              className="input-box textarea"
            />
          </motion.div>

          {/* Button */}
          <motion.button
            className="generate-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <a href="/interviewCard">Generate Interview Report</a>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
