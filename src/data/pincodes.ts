import { PincodeData } from '../types';

/**
 * Standard Indian PIN Code database for instant lookup & delivery estimation
 * Covers major Indian zones and metros with realistic logistics data
 */
export const POPULAR_PINCODES: Record<string, PincodeData> = {
  // Bengaluru
  '560001': { city: 'Bengaluru', state: 'Karnataka', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '560034': { city: 'Koramangala, Bengaluru', state: 'Karnataka', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '560038': { city: 'Indiranagar, Bengaluru', state: 'Karnataka', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '560066': { city: 'Whitefield, Bengaluru', state: 'Karnataka', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '560100': { city: 'Electronic City, Bengaluru', state: 'Karnataka', deliveryDays: 2, codAvailable: true, expressAvailable: true },

  // Mumbai & MMR
  '400001': { city: 'South Mumbai', state: 'Maharashtra', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '400050': { city: 'Bandra, Mumbai', state: 'Maharashtra', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '400076': { city: 'Powai, Mumbai', state: 'Maharashtra', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '400099': { city: 'Andheri, Mumbai', state: 'Maharashtra', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '411001': { city: 'Pune', state: 'Maharashtra', deliveryDays: 2, codAvailable: true, expressAvailable: true },

  // Delhi NCR
  '110001': { city: 'Connaught Place, New Delhi', state: 'Delhi', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '110016': { city: 'Hauz Khas, New Delhi', state: 'Delhi', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '122001': { city: 'Gurugram', state: 'Haryana', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', deliveryDays: 2, codAvailable: true, expressAvailable: true },

  // Hyderabad
  '500001': { city: 'Hyderabad', state: 'Telangana', deliveryDays: 2, codAvailable: true, expressAvailable: true },
  '500081': { city: 'HITEC City, Hyderabad', state: 'Telangana', deliveryDays: 2, codAvailable: true, expressAvailable: true },

  // Chennai
  '600001': { city: 'Chennai', state: 'Tamil Nadu', deliveryDays: 3, codAvailable: true, expressAvailable: true },
  '600028': { city: 'R.A Puram, Chennai', state: 'Tamil Nadu', deliveryDays: 3, codAvailable: true, expressAvailable: true },

  // Kolkata
  '700001': { city: 'Kolkata', state: 'West Bengal', deliveryDays: 3, codAvailable: true, expressAvailable: true },
  '700091': { city: 'Salt Lake, Kolkata', state: 'West Bengal', deliveryDays: 3, codAvailable: true, expressAvailable: true },

  // Ahmedabad / Jaipur
  '380001': { city: 'Ahmedabad', state: 'Gujarat', deliveryDays: 3, codAvailable: true, expressAvailable: true },
  '302001': { city: 'Jaipur', state: 'Rajasthan', deliveryDays: 3, codAvailable: true, expressAvailable: true },

  // Kochi / Chandigarh
  '682001': { city: 'Kochi', state: 'Kerala', deliveryDays: 3, codAvailable: true, expressAvailable: true },
  '160017': { city: 'Chandigarh', state: 'Punjab', deliveryDays: 3, codAvailable: true, expressAvailable: true },
};

/**
 * State lookup by PIN prefix (First 2 digits)
 */
export const STATE_PREFIX_MAP: Record<string, string> = {
  '11': 'Delhi',
  '12': 'Haryana',
  '13': 'Haryana',
  '14': 'Punjab',
  '15': 'Punjab',
  '16': 'Chandigarh',
  '17': 'Himachal Pradesh',
  '18': 'Jammu & Kashmir',
  '19': 'Jammu & Kashmir',
  '20': 'Uttar Pradesh',
  '21': 'Uttar Pradesh',
  '22': 'Uttar Pradesh',
  '23': 'Uttar Pradesh',
  '24': 'Uttar Pradesh',
  '25': 'Uttar Pradesh',
  '26': 'Uttar Pradesh',
  '27': 'Uttar Pradesh',
  '28': 'Uttar Pradesh',
  '30': 'Rajasthan',
  '31': 'Rajasthan',
  '32': 'Rajasthan',
  '33': 'Rajasthan',
  '34': 'Rajasthan',
  '36': 'Gujarat',
  '37': 'Gujarat',
  '38': 'Gujarat',
  '39': 'Gujarat',
  '40': 'Maharashtra',
  '41': 'Maharashtra',
  '42': 'Maharashtra',
  '43': 'Maharashtra',
  '44': 'Maharashtra',
  '45': 'Madhya Pradesh',
  '46': 'Madhya Pradesh',
  '47': 'Madhya Pradesh',
  '48': 'Madhya Pradesh',
  '49': 'Chhattisgarh',
  '50': 'Telangana',
  '51': 'Andhra Pradesh',
  '52': 'Andhra Pradesh',
  '53': 'Andhra Pradesh',
  '56': 'Karnataka',
  '57': 'Karnataka',
  '58': 'Karnataka',
  '59': 'Karnataka',
  '60': 'Tamil Nadu',
  '61': 'Tamil Nadu',
  '62': 'Tamil Nadu',
  '63': 'Tamil Nadu',
  '64': 'Tamil Nadu',
  '67': 'Kerala',
  '68': 'Kerala',
  '69': 'Kerala',
  '70': 'West Bengal',
  '71': 'West Bengal',
  '72': 'West Bengal',
  '73': 'West Bengal',
  '74': 'West Bengal',
  '75': 'Odisha',
  '76': 'Odisha',
  '77': 'Odisha',
  '78': 'Assam',
  '79': 'North Eastern States',
  '80': 'Bihar',
  '81': 'Bihar',
  '82': 'Bihar',
  '83': 'Jharkhand',
  '84': 'Bihar',
  '85': 'Bihar',
};

/**
 * Validates 6-digit Indian PIN Code and returns location details
 */
export function lookupPincode(pincode: string): PincodeData | null {
  const cleanPin = pincode.trim();
  // Valid Indian PIN codes are 6 digits and start with 1-9 (zones 1 to 9)
  if (!/^[1-9]\d{5}$/.test(cleanPin)) return null;

  // Exact match from popular PINs
  if (POPULAR_PINCODES[cleanPin]) {
    return POPULAR_PINCODES[cleanPin];
  }

  // Prefix match
  const prefix2 = cleanPin.substring(0, 2);
  const state = STATE_PREFIX_MAP[prefix2] || 'India';
  
  return {
    city: `District (${cleanPin})`,
    state: state,
    deliveryDays: 4,
    codAvailable: true,
    expressAvailable: false,
  };
}
