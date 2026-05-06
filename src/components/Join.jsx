import './Join.css'

const roles = [
  {
    title: 'Investor',
    description: 'Access curated opportunities',
  },
  {
    title: 'Partner',
    description: 'Build and scale ventures',
  },
  {
    title: 'Supplier',
    description: 'Lead execution',
  },
  {
    title: 'Customer',
    description: 'Unlock growth opportunities',
  },
]

function Join() {
  return (
    <section className="join section" id="join">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', maxWidth: '100%' }}>
          JOIN OUR JOURNEY
        </h2>
        <p className="join-intro">
          Be part of the Portfolio companies that helps companies and entrepreneurs to explore
          and develop business opportunities by leading the projects, identifying and bringing
          together Investors, Partners, Suppliers and Customers to create new companies.
        </p>
        <div className="join-grid">
          {roles.map((role, i) => (
            <div key={i} className="join-card">
              <h3 className="join-card-title">{role.title}</h3>
              <p className="join-card-desc">{role.description}</p>
              <a href="#contact" className="btn-outline join-card-btn">Apply now</a>
            </div>
          ))}
        </div>
        <p className="join-statement">
          WE ARE BUSINESS CREATORS. WE CREATE BUSINESSES BY CONSTANT MOVEMENT AND ACCURATE CAPITAL ALLOCATION.
        </p>
      </div>
    </section>
  )
}

export default Join
