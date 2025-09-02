
export interface OptionItem {
    value: string;
    label: string;
    country?: string;
  }
  
  export interface GroupedOptions {
    [key: string]: OptionItem[];
  }
  
  // Kategori Motor
  export const StatusEvents: OptionItem[] = [
    { value: 'inactive', label: 'Inactive' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'finished', label: 'Finished' },
  
    { value: 'cancelled', label: 'Cancelled' }
  ];

  export const StatusMerchandise: OptionItem[] = [
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold ' },
    { value: 'notavailable', label: 'Not Available' },
    
  ];

  export const visibility: OptionItem[] = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private ' },

    
  ];




//   export type StatusEventsValue = typeof StatusEvents[number]['value'];
export const StatusMerchandiseValue: string[] = StatusMerchandise.map(function(item) {
    return item['value'];
  });





export const StatusEventsValue : string[] = StatusEvents.map(function(item) {
    return item['value'];
  });

  
export const visibilityValue : string[] = visibility.map(function(item) {
    return item['value'];
  });