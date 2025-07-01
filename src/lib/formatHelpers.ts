export function formatPhoneNumber(phone: string | null) {
  if (!phone) 
return "--";
  const digits = phone.replace(/\D/g, "").slice(0, 10);
  if (digits.length !== 10) 
return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatDate(date: string | Date) {
  const d = new Date(date);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
}
