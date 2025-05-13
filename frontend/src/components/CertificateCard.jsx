function CertificateCard({ title, issuer, date, imageUrl }) {
  return (
    <div className="card" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      {imageUrl && (
        <div className="mb-2">
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
        </div>
      )}
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{title}</h3>
      <p className="mb-2">Issued by: {issuer}</p>
      <p className="mb-2">Date: {date}</p>
    </div>
  )
}
export default CertificateCard 