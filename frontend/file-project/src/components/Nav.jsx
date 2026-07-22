import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  BrainCircuit
} from "lucide-react";


const Nav = () => {

  const [open, setOpen] = useState(false);


  const links = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Services",
      path: "/services"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Contact",
      path: "/contact"
    }
  ];


  return (

    <header className="
    fixed
    top-0
    left-0
    w-full
    z-50
    bg-[#020617]/80
    backdrop-blur-xl
    border-b
    border-white/10
    ">

      <nav className="
      max-w-7xl
      mx-auto
      px-6
      lg:px-8
      h-20
      flex
      items-center
      justify-between
      ">


        {/* Premium Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div
            className="
          relative
          flex
          items-center
          justify-center
          h-11
          w-11
          rounded-2xl
          bg-gradient-to-br
          from-violet-500
          via-blue-500
          to-cyan-400
          shadow-lg
          shadow-violet-500/30
          "
          >

            <BrainCircuit
              className="text-white"
              size={27}
            />

            <Sparkles
              size={12}
              className="
            absolute
            -top-1
            -right-1
            text-yellow-300
            "
            />

          </div>


          <div>

            <h1
              className="
            text-xl
            font-bold
            tracking-tight
            text-white
            "
            >
              Resume
              <span className="text-cyan-400">
                AI
              </span>
            </h1>


            <p
              className="
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-slate-400
            "
            >
              Smart Career Engine
            </p>


          </div>


        </Link>



        {/* Desktop Menu */}

        <div
          className="
        hidden
        md:flex
        items-center
        gap-9
        "
        >

          {
            links.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `
              relative
              text-sm
              font-medium
              transition
              ${isActive
                    ?
                    "text-cyan-400"
                    :
                    "text-slate-300 hover:text-white"
                  }
              `
                }
              >

                {link.name}


              </NavLink>

            ))
          }


          <Link
            to="/analyze"
            className="
          rounded-xl
          bg-gradient-to-r
          from-violet-500
          to-blue-500
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-violet-500/30
          transition
          hover:-translate-y-1
          hover:shadow-violet-500/50
          "
          >
            Analyze Resume
          </Link>


        </div>




        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="
        md:hidden
        text-white
        "
        >

          {
            open
              ?
              <X size={30} />
              :
              <Menu size={30} />
          }


        </button>



      </nav>



      {/* Mobile Menu */}

      {
        open && (

          <div
            className="
          md:hidden
          bg-[#020617]
          border-t
          border-white/10
          px-6
          py-6
          space-y-5
          "
          >

            {
              links.map((link) => (

                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="
                block
                text-slate-300
                hover:text-cyan-400
                text-lg
                "
                >

                  {link.name}

                </NavLink>

              ))
            }


            <Link
              to="/analyze"
              className="
            block
            text-center
            rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-blue-500
            py-3
            font-semibold
            text-white
            "
            >
              Analyze Resume
            </Link>


          </div>

        )
      }


    </header>

  );
};


export default Nav;