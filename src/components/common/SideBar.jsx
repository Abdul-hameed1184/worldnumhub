import { useActiveSidebarLinks } from "../../hooks/SetActiveSidebar";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, darkMode, toggleSidebar }) => {
  const sidebarLinks = useActiveSidebarLinks();

  return (
    <>
      {/* === Backdrop for mobile only === */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/30 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* === Sidebar === */}
      <aside
        className={`
          fixed top-0 left-0 h-full overflow-y-auto border-r transition-all duration-300 ease-in-out z-50
          ${darkMode ? "bg-gray-900 text-white border-gray-800" : "bg-white text-gray-900 border-gray-200"}

          // Width changes
          ${isOpen ? "w-64" : "w-16"}
          
          // Slide out on mobile when closed
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* === Logo & Toggle Button === */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen ? (
            <img src="/logo.png" alt="Logo" className="w-35 h-auto" />
          ) : (
            <img src="/icon.png" alt="Mini Logo" className="w-8 h-auto" />
          )}
          <button className="text-xl ml-auto lg:block" onClick={toggleSidebar}>
            {isOpen ? "‹" : ""}
          </button>
        </div>

        {/* === Navigation === */}
        <nav className="p-2">
          {sidebarLinks.map((section, index) => (
            <div key={index} className="mb-4">
              {isOpen && section.section && (
                <p className="text-xs font-semibold px-3 py-1 uppercase text-gray-500">
                  {section.section}
                </p>
              )}

              <ul className="space-y-1">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.link}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${link.active
                          ? darkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-black"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"}
                      `}
                      onClick={() => {
                        // Auto-close sidebar on mobile only
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                    >
                      {link.icon}
                      {isOpen && <span>{link.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
