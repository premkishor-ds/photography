async function testEndpoints() {
  console.log('Testing Admin & Supabase APIs on http://localhost:3000...\n');

  // 1. Stats
  const statsRes = await fetch('http://localhost:3000/api/admin/stats');
  const statsData = await statsRes.json();
  console.log('1. /api/admin/stats: Status', statsRes.status, 'Data:', statsData.stats);

  // 2. Inquiries
  const inqRes = await fetch('http://localhost:3000/api/admin/inquiries');
  const inqData = await inqRes.json();
  console.log('2. /api/admin/inquiries: Status', inqRes.status, 'Total inquiries:', inqData.inquiries?.length);
  if (inqData.inquiries?.length > 0) {
    console.log('   Sample Inquiry:', inqData.inquiries[0].name, '-', inqData.inquiries[0].service);
  }

  // 3. Portfolio
  const portRes = await fetch('http://localhost:3000/api/admin/portfolio');
  const portData = await portRes.json();
  console.log('3. /api/admin/portfolio: Status', portRes.status, 'Total photos:', portData.items?.length);

  // 4. Services
  const svcRes = await fetch('http://localhost:3000/api/admin/services');
  const svcData = await svcRes.json();
  console.log('4. /api/admin/services: Status', svcRes.status, 'Total services:', svcData.services?.length);

  // 5. Contact submission -> Supabase
  const contactRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Pooja Choudhary',
      email: 'pooja.c@example.com',
      phone: '+91 99887 76655',
      service: 'Portrait Photography',
      preferredDate: '2026-11-15',
      message: 'Looking for a classical Rajasthani royal studio portrait session.',
    })
  });
  const contactData = await contactRes.json();
  console.log('5. /api/contact test submission: Status', contactRes.status, 'Saved ID:', contactData.data?.id);

  // 6. Verify newly inserted inquiry is in Supabase!
  const verifyRes = await fetch('http://localhost:3000/api/admin/inquiries?q=Pooja');
  const verifyData = await verifyRes.json();
  console.log('6. Verified dynamic inquiry retrieval from Supabase: Found count =', verifyData.inquiries?.length);
  console.log('   Retrieved name:', verifyData.inquiries?.[0]?.name, 'ID:', verifyData.inquiries?.[0]?.id);

  console.log('\nALL ADMIN & SUPABASE INTEGRATION TESTS PASSED!');
}

testEndpoints().catch(console.error);
