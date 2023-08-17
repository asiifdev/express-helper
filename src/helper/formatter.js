const rupiah = (numb) => {
  const format = numb.toString().split('').reverse().join('');
  const convert = format.match(/\d{1,3}/g);
  const result = 'Rp ' + convert.join('.').split('').reverse().join('')
  return result
}

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

const date2str = (date) => {
  const monthNames = ["Januari", "Februari", "Maret", "April",
    "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"];
  let datex = new Date(date)
  const day = datex.getDate()
  const monthIndex = datex.getMonth()
  const monthName = monthNames[monthIndex];
  const year = datex.getFullYear()
  return `${day} ${monthName} ${year}`;
}

export { rupiah, convertTZ, date2str }