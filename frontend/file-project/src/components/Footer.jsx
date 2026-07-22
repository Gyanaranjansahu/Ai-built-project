import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";


export default function Footer() {

  return (

    <footer
      className="
      relative
      overflow-hidden
      border-t
      border-white/10
      bg-[#020617]
      text-white
      "
    >

      {/* Background Glow */}
      <div
        className="
        absolute
        -left-20
        bottom-0
        h-72
        w-72
        rounded-full
        bg-violet-600/20
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -right-20
        top-0
        h-72
        w-72
        rounded-full
        bg-cyan-500/20
        blur-3xl
        "
      />


      <div
        className="
        relative
        mx-auto
        max-w-7xl
        px-6
        py-16
        "
      >


        <div
          className="
          grid
          gap-10
          md:grid-cols-4
          "
        >


          {/* Brand */}

          <div className="md:col-span-2">

            <Link
              to="/"
              className="
              flex
              items-center
              gap-3
              "
            >

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500
                to-cyan-400
                shadow-lg
                shadow-violet-500/30
                "
              >

                <BrainCircuit
                  size={28}
                  className="text-white"
                />

              </div>


              <div>

                <h2
                  className="
                  text-2xl
                  font-bold
                  "
                >
                  Resume
                  <span className="text-cyan-400">
                    AI
                  </span>
                </h2>


                <p
                  className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-slate-400
                  "
                >
                  Smart Career Engine
                </p>


              </div>


            </Link>



            <p
              className="
              mt-6
              max-w-md
              leading-7
              text-slate-400
              "
            >
              AI-powered resume analysis that helps you
              improve your ATS score and discover better
              career opportunities.
            </p>



            {/* Social */}

            <div
              className="
              mt-6
              flex
              gap-3
              "
            >

              <a
                href="#"
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-slate-400
                transition
                hover:border-violet-400/40
                hover:text-white
                "
              >
                <FaGithub size={18}/>
              </a>


              <a
                href="#"
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-slate-400
                transition
                hover:border-violet-400/40
                hover:text-white
                "
              >
                <FaLinkedin size={18}/>
              </a>


              <a
                href="#"
                className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/5
                text-slate-400
                transition
                hover:border-violet-400/40
                hover:text-white
                "
              >
                <FaTwitter size={18}/>
              </a>


            </div>


          </div>





          {/* Product */}

          <div>

            <h3
              className="
              mb-5
              font-semibold
              text-white
              "
            >
              Product
            </h3>


            <div
              className="
              space-y-3
              text-sm
              text-slate-400
              "
            >

              <Link
                to="/analyze"
                className="block hover:text-cyan-400 transition"
              >
                Analyze Resume
              </Link>


              <Link
                to="/services"
                className="block hover:text-cyan-400 transition"
              >
                Services
              </Link>


              <Link
                to="/dashboard"
                className="block hover:text-cyan-400 transition"
              >
                Dashboard
              </Link>


            </div>

          </div>





          {/* Company */}

          <div>

            <h3
              className="
              mb-5
              font-semibold
              text-white
              "
            >
              Company
            </h3>


            <div
              className="
              space-y-3
              text-sm
              text-slate-400
              "
            >

              <Link
                to="/about"
                className="block hover:text-cyan-400 transition"
              >
                About
              </Link>


              <Link
                to="/contact"
                className="block hover:text-cyan-400 transition"
              >
                Contact
              </Link>


              <Link
                to="/login"
                className="block hover:text-cyan-400 transition"
              >
                Login
              </Link>


            </div>

          </div>


        </div>





        {/* CTA */}

        <div
          className="
          mt-14
          flex
          flex-col
          gap-5
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-6
          backdrop-blur-xl
          md:flex-row
          md:items-center
          md:justify-between
          "
        >

          <div>

            <h3 className="text-xl font-bold">
              Ready to improve your resume?
            </h3>


            <p className="mt-1 text-slate-400">
              Get your AI analysis and career insights.
            </p>

          </div>



          <Link
            to="/analyze"
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-cyan-500
            px-6
            py-3
            font-semibold
            transition
            hover:-translate-y-1
            "
          >

            Analyze Now

            <ArrowRight size={18}/>

          </Link>


        </div>





        {/* Bottom */}

        <div
          className="
          mt-10
          flex
          flex-col
          gap-3
          border-t
          border-white/10
          pt-6
          text-sm
          text-slate-500
          md:flex-row
          md:justify-between
          "
        >

          <p>
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>


          <p>
            Built with AI • Designed for careers
          </p>


        </div>


      </div>


    </footer>

  );

}