import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Platform',
      links: [
        { name: 'Marketplace', to: '/marketplace' },
        { name: 'Expert Advisory', to: '/advisory' },
        { name: 'Crop Management', to: '/crop-management' },
        { name: 'Alerts', to: '/alerts' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', to: '/about' },
        { name: 'Contact', to: '/contact' },
        { name: 'Careers', to: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', to: '/help' },
        { name: 'Terms of Service', to: '/terms' },
        { name: 'Privacy Policy', to: '/privacy' },
      ],
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-green-400">SAIS</h3>
            <p className="mt-4 text-sm text-gray-400">
              A cloud-native platform connecting agriculture across regions via Wide Area Networks.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-300">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Smart Agriculture Information System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
