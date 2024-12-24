export const OLLAMA_CONFIG = {
  baseUrl: 'http://192.168.0.15:11434',
  model: 'ALIENTELLIGENCE/gourmetglobetrotter',
  temperature: 0.7,
  maxTokens: 1000,
};

export interface LLMResponse {
  response: string;
  context: any[];
}