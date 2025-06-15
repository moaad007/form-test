document.addEventListener('DOMContentLoaded', function () {
  const registrations = [
    {
      parentName: "Ahmed Mohamed",
      parentEmail: "ahmed@example.com",
      parentPhone: "0501234567",
      numChildren: 2,
      parentAddress: "Riyadh",
      summerPlan: "Premium Plan",
      children: [
        { name: "Ali Ahmed", age: 10 },
        { name: "Fatima Ahmed", age: 8 }
      ],
      note: "Please call me before the session"
    },
    {
      parentName: "Laila Khaled",
      parentEmail: "laila@example.com",
      parentPhone: "0557654321",
      numChildren: 1,
      parentAddress: "Jeddah",
      summerPlan: "Basic Plan",
      children: [
        { name: "Yousef Laila", age: 12 }
      ],
      note: "No additional notes"
    },
    {
      parentName: "Laila Khaled",
      parentEmail: "laila@example.com",
      parentPhone: "0557654321",
      numChildren: 1,
      parentAddress: "Jeddahbbgbbbbgbbgbggbggbgggg",
      summerPlan: "Basic Plan",
      children: [
        { name: "Yousef Laila", age: 12 }
      ],
      note: ""
    }
  ];

  const dashboardTableBody = document.getElementById('registrationsTable');
  const totalFamiliesEl = document.getElementById('totalFamilies');
  const totalKidsEl = document.getElementById('totalKids');
  const avgKidsEl = document.getElementById('avgKids');
  const ageRangeEl = document.getElementById('ageRange');
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  dashboardTableBody.innerHTML = "";

  registrations.forEach((registration) => {
    if (isMobile) {
      // For mobile: one row per registration, th in first column, data in second
      const fields = [
        { label: "Parent Name", value: registration.parentName },
        { label: "Contact", value: `${registration.parentPhone} | ${registration.parentEmail}` },
        { label: "Address", value: registration.parentAddress },
        { label: "Children", value: registration.children.map(child => child.name).join(', ') + " (" + registration.children.map(child => child.age).join(', ') + " yrs)" },
        { label: "Registration Date", value: new Date().toLocaleDateString() },
        { label: "Notes", value: registration.note || 'No notes' }
      ];
      fields.forEach(field => {
        const row = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = field.label;
        th.style.width = "40%";
        const td = document.createElement('td');
        td.textContent = field.value;
        td.style.width = "60%";
        row.appendChild(th);
        row.appendChild(td);
        dashboardTableBody.appendChild(row);
      });
      // Add a separator row for spacing
      const sep = document.createElement('tr');
      sep.innerHTML = `<td colspan="2" style="height:10px;border:none;background:none"></td>`;
      dashboardTableBody.appendChild(sep);
    } else {
      // For desktop: classic table row
      const row = dashboardTableBody.insertRow();
      row.insertCell().textContent = registration.parentName;
      row.insertCell().textContent = `${registration.parentPhone} | ${registration.parentEmail}`;
      row.insertCell().textContent = registration.parentAddress;
      const childNames = registration.children.map(child => child.name).join(', ');
      const childAges = registration.children.map(child => child.age);
      row.insertCell().textContent = `${childNames} (${childAges.join(', ')} yrs)`;
      row.insertCell().textContent = new Date().toLocaleDateString();
      row.insertCell().textContent = registration.note || 'No notes';
    }
  });

  let totalKids = 0;
  let allAges = [];

  registrations.forEach((registration) => {
    const childAges = registration.children.map(child => child.age);
    totalKids += registration.children.length;
    allAges.push(...childAges);
  });

  totalFamiliesEl.textContent = registrations.length;
  totalKidsEl.textContent = totalKids;
  avgKidsEl.textContent = (totalKids / registrations.length).toFixed(1);

  if (allAges.length > 0) {
    const minAge = Math.min(...allAges);
    const maxAge = Math.max(...allAges);
    ageRangeEl.textContent = `${minAge} - ${maxAge} yrs`;
  } else {
    ageRangeEl.textContent = '—';
  }
});
