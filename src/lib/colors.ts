




export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",  // Style 1: Dark red background with bright pink text and a semi-transparent pink border
  "bg-[#1e3a8a] text-[#fbbf24] border-[1px] border-[#ffd60abb]",  // Style 2: Deep blue background with golden yellow text and a solid yellow border
  "bg-[#9ca3af] text-[#1f2937] border-[1px] border-[#06d6abb]",  // Style 3: Light gray background with dark gray text and a light gray border
  "bg-[#10b981] text-[#ffffff] border-[1px] border-[#4ade80]", 

  'text-white dark:bg-primary border   dark:text-background dark:border-border ' 
];


export const getColor=(color:any)=>{
  if(color>=0&&color<colors.length){
    return colors[color]
  }
  return colors[0]
}
