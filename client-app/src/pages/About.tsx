import { MapPin } from "lucide-react";
import type { AboutProp } from "./about/about-data";
import AboutHeader from "./about/about-header";

type AboutProps = {
  team: AboutProp[];
};

const About = ({ team }: AboutProps) => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-r to-[#ece9f1] from-[#6a5ca3] pb-8">
        <AboutHeader />
      <strong className="font-semibold text-[#ece9f1] text-3xl text-center block px-8 mt-4">Meet The Team</strong>

      <div className="flex flex-col items-center gap-6 mt-8 max-w-7xl mx-auto px-4 sm:px-6">
        {team[0] && (
          <div className="w-full max-w-sm sm:w-80 h-auto min-h-96 rounded-xl p-6 pb-8 shadow text-[#6a5ca3] bg-white/90 backdrop-blur-sm flex flex-col items-center">
            <img
              src={team[0].image}
              alt={team[0].name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-[#6a5ca3]"
            />
            <h2 className="text-2xl font-medium text-gray-800 text-center">{team[0].name}</h2>
            <p className="text-center text-base font-medium">
              {team[0].role} 
              {team[0].location && (
                <span className="flex items-center justify-center gap-1 mt-1 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-700" />
                  {team[0].location}
                </span>
              )}
            </p>
            {team[0].bio && <p className="mt-2 text-center flex-1 text-base">{team[0].bio}</p>}
            {team[0].skills.length > 0 && (
              <div className="mt-2 text-center">
                <span className="font-semibold mb-2 block text-base">Skills:</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {team[0].skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-[#9988c3] to-[#6a5ca3] text-white text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {team[0].website && (
              <div className="mt-2 text-center">
                <a
                  href={team[0].website}
                  className="text-gray-600 hover:text-gray-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  website
                </a>
              </div>
            )}
            {team[0].socialLinks && (
              <div className="mt-2 flex justify-center gap-2 flex-wrap">
                {team[0].socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    className="text-gray-600 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-6 w-full max-w-7xl mt-8">
          {team[1] && (
            <div className="w-full max-w-sm sm:w-80 h-auto min-h-96 rounded-xl p-6 pb-8 shadow text-[#6a5ca3] bg-white/90 backdrop-blur-sm flex flex-col items-center">
              <img
                src={team[1].image}
                alt={team[1].name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-[#6a5ca3]"
              />
              <h2 className="text-2xl font-medium text-gray-800 text-center">{team[1].name}</h2>
              <p className="text-center text-base font-medium">
                {team[1].role}
                {team[1].location && (
                  <span className="flex items-center justify-center gap-1 mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-700" />
                    {team[1].location}
                  </span>
                )}
              </p>
              {team[1].bio && <p className="mt-2 text-center flex-1 text-base">{team[1].bio}</p>}
              {team[1].skills.length > 0 && (
                <div className="mt-2 text-center">
                  <span className="font-semibold mb-2 block text-base">Skills:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {team[1].skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-[#9988c3] to-[#6a5ca3] text-white text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {team[1].website && (
                <div className="mt-2 text-center">
                  <a
                    href={team[1].website}
                    className="text-gray-600 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    website
                  </a>
                </div>
              )}
              {team[1].socialLinks && (
                <div className="mt-2 flex justify-center gap-2 flex-wrap">
                  {team[1].socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="text-gray-600 hover:text-gray-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {team[2] && (
            <div className="w-full max-w-sm sm:w-80 h-auto min-h-96 rounded-xl p-6 pb-8 shadow text-[#6a5ca3] bg-white/90 backdrop-blur-sm flex flex-col items-center">
              <img
                src={team[2].image}
                alt={team[2].name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-[#6a5ca3]"
              />
              <h2 className="text-2xl font-medium text-gray-800 text-center">{team[2].name}</h2>
              <p className="text-center text-base font-medium">
                {team[2].role} 
                {team[2].location && (
                  <span className="flex items-center justify-center gap-1 mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-700" />
                    {team[2].location}
                  </span>
                )}
              </p>
              {team[2].bio && <p className="mt-2 text-center flex-1 text-base">{team[2].bio}</p>}
              {team[2].skills.length > 0 && (
                <div className="mt-2 text-center">
                  <span className="font-semibold mb-2 block text-base">Skills:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {team[2].skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-[#9988c3] to-[#6a5ca3] text-white text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {team[2].website && (
                <div className="mt-2 text-center">
                  <a
                    href={team[2].website}
                    className="text-gray-600 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    website
                  </a>
                </div>
              )}
              {team[2].socialLinks && (
                <div className="mt-2 flex justify-center gap-2 flex-wrap">
                  {team[2].socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="text-gray-600 hover:text-gray-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {team[3] && (
            <div className="w-full max-w-sm sm:w-80 h-auto min-h-96 rounded-xl p-6 pb-8 shadow text-[#6a5ca3] bg-white/90 backdrop-blur-sm flex flex-col items-center">
              <img
                src={team[3].image}
                alt={team[3].name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-[#6a5ca3]"
              />
              <h2 className="text-2xl font-medium text-gray-800 text-center">{team[3].name}</h2>
              <p className="text-center text-base font-medium">
                {team[3].role} 
                {team[3].location && (
                  <span className="flex items-center justify-center gap-1 mt-1 text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-700" />
                    {team[3].location}
                  </span>
                )}
              </p>
              {team[3].bio && <p className="mt-2 text-center flex-1 text-base">{team[3].bio}</p>}
              {team[3].skills.length > 0 && (
                <div className="mt-2 text-center">
                  <span className="font-semibold mb-2 block text-base">Skills:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {team[3].skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-[#9988c3] to-[#6a5ca3] text-white text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {team[3].website && (
                <div className="mt-2 text-center">
                  <a
                    href={team[3].website}
                    className="text-gray-600 hover:text-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    website
                  </a>
                </div>
              )}
              {team[3].socialLinks && (
                <div className="mt-2 flex justify-center gap-2 flex-wrap">
                  {team[3].socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="text-gray-600 hover:text-gray-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
