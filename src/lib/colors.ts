




export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",  // Style 1: Dark red background with bright pink text and a semi-transparent pink border
  "bg-[#1e3a8a] text-[#fbbf24] border-[1px] border-[#ffd60abb]",  // Style 2: Deep blue background with golden yellow text and a solid yellow border
  "bg-[#9ca3af] text-[#1f2937] border-[1px] border-[#06d6abb]",  // Style 3: Light gray background with dark gray text and a light gray border
  "bg-[#10b981] text-[#ffffff] border-[1px] border-[#4ade80]", 

  'text-white dark:bg-primary border   dark:text-background dark:border-border ' 
];


export const colorSets = [
  {
    bg: "rgba(255, 182, 193, 0.35)", // light pink
    border: "#ff69b4", // hot pink
    fontColor: "#c71585" // medium violet red
  },
  {
    bg: "rgba(173, 216, 230, 0.35)", // light blue
    border: "#4682b4", // steel blue
    fontColor: "#00008b" // dark blue
  },
  {
    bg: "rgba(144, 238, 144, 0.35)", // light green
    border: "#32cd32", // lime green
    fontColor: "#006400" // dark green
  },
  {
    bg: "rgba(255, 239, 213, 0.35)", // papaya whip
    border: "#ffa07a", // light salmon
    fontColor: "#d2691e" // chocolate
  },
  {
    bg: "rgba(255, 218, 185, 0.35)", // peach puff
    border: "#ff6347", // tomato
    fontColor: "#b22222" // firebrick
  }
];




export const getColor=(color:any)=>{
  if(color>=0&&color<colors.length){
    return colors[color]
  }
  return colors[0]
}
