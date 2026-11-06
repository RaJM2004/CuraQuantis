export interface StateTerritory {
  id: string;
  name: string;
  code: string;
  zone: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'Union Territory';
  isUnionTerritory?: boolean;
  tier: 1 | 2 | 3;
  majorHubs: string[];
  approxPopulation: string;
}

export const INDIA_TERRITORIES: StateTerritory[] = [
  // North
  { id: 'delhi', name: 'Delhi NCR', code: 'DL', zone: 'North', isUnionTerritory: true, tier: 1, majorHubs: ['New Delhi', 'South Delhi', 'Rohini', 'Dwarka'], approxPopulation: '32M' },
  { id: 'punjab', name: 'Punjab', code: 'PB', zone: 'North', tier: 2, majorHubs: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Mohali'], approxPopulation: '30M' },
  { id: 'haryana', name: 'Haryana', code: 'HR', zone: 'North', tier: 2, majorHubs: ['Gurugram', 'Faridabad', 'Panipat', 'Ambala'], approxPopulation: '28M' },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', code: 'HP', zone: 'North', tier: 3, majorHubs: ['Shimla', 'Dharamshala', 'Mandi', 'Solan'], approxPopulation: '7.5M' },
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', code: 'JK', zone: 'North', isUnionTerritory: true, tier: 3, majorHubs: ['Srinagar', 'Jammu', 'Anantnag'], approxPopulation: '14M' },
  { id: 'ladakh', name: 'Ladakh', code: 'LA', zone: 'North', isUnionTerritory: true, tier: 3, majorHubs: ['Leh', 'Kargil'], approxPopulation: '0.3M' },
  { id: 'uttarakhand', name: 'Uttarakhand', code: 'UK', zone: 'North', tier: 3, majorHubs: ['Dehradun', 'Haridwar', 'Haldwani', 'Rishikesh'], approxPopulation: '11.5M' },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', code: 'UP', zone: 'North', tier: 2, majorHubs: ['Lucknow', 'Kanpur', 'Noida', 'Varanasi', 'Agra'], approxPopulation: '235M' },
  { id: 'chandigarh', name: 'Chandigarh', code: 'CH', zone: 'North', isUnionTerritory: true, tier: 2, majorHubs: ['Chandigarh Tri-city'], approxPopulation: '1.2M' },

  // South
  { id: 'tamil-nadu', name: 'Tamil Nadu', code: 'TN', zone: 'South', tier: 1, majorHubs: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'], approxPopulation: '78M' },
  { id: 'karnataka', name: 'Karnataka', code: 'KA', zone: 'South', tier: 1, majorHubs: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'], approxPopulation: '68M' },
  { id: 'telangana', name: 'Telangana', code: 'TS', zone: 'South', tier: 1, majorHubs: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'], approxPopulation: '38M' },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', code: 'AP', zone: 'South', tier: 2, majorHubs: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'], approxPopulation: '53M' },
  { id: 'kerala', name: 'Kerala', code: 'KL', zone: 'South', tier: 2, majorHubs: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'], approxPopulation: '35M' },
  { id: 'puducherry', name: 'Puducherry', code: 'PY', zone: 'South', isUnionTerritory: true, tier: 3, majorHubs: ['Puducherry', 'Karaikal'], approxPopulation: '1.5M' },
  { id: 'lakshadweep', name: 'Lakshadweep', code: 'LD', zone: 'South', isUnionTerritory: true, tier: 3, majorHubs: ['Kavaratti'], approxPopulation: '0.07M' },

  // West
  { id: 'maharashtra', name: 'Maharashtra', code: 'MH', zone: 'West', tier: 1, majorHubs: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad'], approxPopulation: '126M' },
  { id: 'gujarat', name: 'Gujarat', code: 'GJ', zone: 'West', tier: 1, majorHubs: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'], approxPopulation: '70M' },
  { id: 'rajasthan', name: 'Rajasthan', code: 'RJ', zone: 'West', tier: 2, majorHubs: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bikaner'], approxPopulation: '80M' },
  { id: 'goa', name: 'Goa', code: 'GA', zone: 'West', tier: 3, majorHubs: ['Panaji', 'Margao', 'Vasco'], approxPopulation: '1.6M' },
  { id: 'dadra-nagar-haveli-daman-diu', name: 'Dadra & Nagar Haveli and Daman & Diu', code: 'DN', zone: 'West', isUnionTerritory: true, tier: 3, majorHubs: ['Daman', 'Silvassa'], approxPopulation: '0.6M' },

  // East
  { id: 'west-bengal', name: 'West Bengal', code: 'WB', zone: 'East', tier: 1, majorHubs: ['Kolkata', 'Siliguri', 'Asansol', 'Durgapur', 'Howrah'], approxPopulation: '98M' },
  { id: 'odisha', name: 'Odisha', code: 'OD', zone: 'East', tier: 2, majorHubs: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'], approxPopulation: '45M' },
  { id: 'bihar', name: 'Bihar', code: 'BR', zone: 'East', tier: 2, majorHubs: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'], approxPopulation: '128M' },
  { id: 'jharkhand', name: 'Jharkhand', code: 'JH', zone: 'East', tier: 3, majorHubs: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'], approxPopulation: '39M' },
  { id: 'andaman-nicobar', name: 'Andaman & Nicobar Islands', code: 'AN', zone: 'East', isUnionTerritory: true, tier: 3, majorHubs: ['Port Blair'], approxPopulation: '0.4M' },

  // Central
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', code: 'MP', zone: 'Central', tier: 2, majorHubs: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior'], approxPopulation: '85M' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', code: 'CG', zone: 'Central', tier: 3, majorHubs: ['Raipur', 'Bhilai', 'Bilaspur'], approxPopulation: '30M' },

  // North-East
  { id: 'assam', name: 'Assam', code: 'AS', zone: 'North-East', tier: 2, majorHubs: ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat'], approxPopulation: '35M' },
  { id: 'meghalaya', name: 'Meghalaya', code: 'ML', zone: 'North-East', tier: 3, majorHubs: ['Shillong', 'Tura'], approxPopulation: '3.3M' },
  { id: 'tripura', name: 'Tripura', code: 'TR', zone: 'North-East', tier: 3, majorHubs: ['Agartala', 'Udaipur'], approxPopulation: '4.1M' },
  { id: 'manipur', name: 'Manipur', code: 'MN', zone: 'North-East', tier: 3, majorHubs: ['Imphal'], approxPopulation: '3.2M' },
  { id: 'nagaland', name: 'Nagaland', code: 'NL', zone: 'North-East', tier: 3, majorHubs: ['Kohima', 'Dimapur'], approxPopulation: '2.2M' },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', code: 'AR', zone: 'North-East', tier: 3, majorHubs: ['Itanagar', 'Naharlagun'], approxPopulation: '1.6M' },
  { id: 'mizoram', name: 'Mizoram', code: 'MZ', zone: 'North-East', tier: 3, majorHubs: ['Aizawl', 'Lunglei'], approxPopulation: '1.2M' },
  { id: 'sikkim', name: 'Sikkim', code: 'SK', zone: 'North-East', tier: 3, majorHubs: ['Gangtok'], approxPopulation: '0.7M' },
];

export const ZONES = ['All', 'North', 'South', 'West', 'East', 'Central', 'North-East'] as const;
