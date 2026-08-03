export default function TrustedBy() {
  const logos = [
    { icon: 'mdi:cloud-outline', name: 'CloudPay' },
    { icon: 'mdi:shield-check-outline', name: 'SecureHub' },
    { icon: 'mdi:chart-line', name: 'GrowthQ' },
    { icon: 'mdi:store-outline', name: 'RetailPro' },
    { icon: 'mdi:robot-outline', name: 'AutoMate' },
  ];

  return (
    <section className="py-16 bg-stone-50 border-y border-stone-200 reveal">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-10">
          Trusted by Innovative Companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2 text-stone-600">
              <span className="iconify" data-icon={logo.icon} data-width="28" />
              <span className="text-lg font-semibold">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}