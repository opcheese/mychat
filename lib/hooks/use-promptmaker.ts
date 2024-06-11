

export const usePromptMaker = (prompt: string, template: string|null, sample: string|null) => {
 
let start = "You are a helpful assistant. Try to answer the prompt to the best of your ability. "
if (template && template.length > 0) {
  start += `Format your answer based on a the following template |||template start|||\n ${template} \n |||template end|||\n `
}
if (sample && sample.length > 0) {
  start += `Here is a possible example |||sample start|||\n ${sample} \n|||sample end|||\n `
}
start += `Here is the prompt |||prompt start|||\n ${prompt} \n |||prompt end|||\n`

const res = start
return res;
}
