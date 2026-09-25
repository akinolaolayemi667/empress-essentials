export const business = {
  name: 'Empress Essentials',
  location: 'Lagos, Nigeria',
  domesticCountry: 'Nigeria',
  policiesUpdated: '2026-09-25T12:00:00',
  returnWindowDays: 7,
}

export type ContactChannelId = 'email' | 'phone' | 'whatsapp' | 'instagram'

export type ContactChannel = {
  id: ContactChannelId
  label: string
  /** Leave empty until ready; empty channels render as "Coming soon". */
  value: string
}

export const contactChannels: ContactChannel[] = [
  { id: 'email', label: 'Email', value: '' },
  { id: 'phone', label: 'Phone', value: '' },
  { id: 'whatsapp', label: 'WhatsApp', value: '' },
  { id: 'instagram', label: 'Instagram', value: '' },
]

export type DeliveryEstimate = {
  region: string
  time: string
}

export const deliveryEstimates: DeliveryEstimate[] = [
  { region: 'Lagos', time: '2–4 working days' },
  { region: 'Other states in Nigeria', time: '5–7 working days' },
  { region: 'International', time: 'Confirmed with your shipping quote' },
]
