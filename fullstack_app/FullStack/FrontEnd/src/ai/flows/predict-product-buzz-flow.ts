
'use server';
/**
 * @fileOverview An AI flow to predict product buzz, potential occasions, peak demand, and other insights.
 *
 * - predictProductBuzz - A function that analyzes product/ad data to generate buzz predictions.
 * - ProductAdDataInput - The input type for the predictProductBuzz function.
 * - ProductBuzzOutput - The return type for the predictProductBuzz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema based on potential data from an API
export const ProductAdDataInputSchema = z.object({
  productId: z.string().describe('Unique identifier for the product.'),
  productName: z.string().describe('Name of the product.'),
  platform: z
    .enum(['TikTok', 'Facebook', 'Instagram', 'GoogleTrends', 'Other'])
    .describe('The platform from which the data originates.'),
  views: z.number().optional().describe('Number of views (e.g., ad views, video views).'),
  clicks: z.number().optional().describe('Number of clicks.'),
  shares: z.number().optional().describe('Number of shares.'),
  comments: z.number().optional().describe('Number of comments.'),
  likes: z.number().optional().describe('Number of likes.'),
  ctr: z.number().optional().describe('Click-Through Rate (e.g., 0.05 for 5%).'),
  positiveSentimentScore: z
    .number()
    .optional()
    .describe(
      'A pre-calculated score (0-1) representing positive sentiment. 1 is very positive.'
    ),
  rawCommentSamples: z
    .array(z.string())
    .optional()
    .describe('A few sample comments for AI sentiment analysis if sentimentScore is not available.'),
  searchVolumeIncrease: z
    .number()
    .optional()
    .describe('Percentage increase in search volume over a recent period (e.g., last 7 days).'),
  category: z.string().optional().describe('Product category (e.g., "Electronics", "Fashion").'),
  primaryKeywords: z
    .array(z.string())
    .describe('Main keywords associated with the product or ad campaign.'),
  primaryTargetGeos: z
    .array(z.string())
    .optional()
    .describe('Primary target geographic areas (e.g., ["USA", "California", "urban areas"]).'),
  daysActive: z
    .number()
    .optional()
    .describe('How long the ad has been running or the product has been monitored.'),
  pricePoint: z.number().optional().describe('The approximate price of the product in USD.'),
  additionalContext: z.string().optional().describe('Any other relevant context or notes about the product or its performance.')
});
export type ProductAdDataInput = z.infer<typeof ProductAdDataInputSchema>;

// Define the output schema for the buzz prediction
export const ProductBuzzOutputSchema = z.object({
  buzzScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score from 0-100 indicating the predicted buzz level. Higher is better.'
    ),
  potentialOccasions: z
    .array(z.string())
    .describe(
      'Suggested upcoming occasions or events this product might be suitable for (e.g., ["Christmas", "Summer Vacation", "Back to School"]).'
    ),
  predictedPeakDemandWindow: z
    .string()
    .describe(
      'An estimated timeframe for when the product might see peak demand (e.g., "Next 2-4 weeks", "Q4", "Mid-November to late December").'
    ),
  keyInsights: z
    .array(z.string())
    .describe(
      'Actionable insights or reasons behind the prediction (e.g., ["High share rate on TikTok indicates strong virality potential", "Keywords align with upcoming gifting season", "Recent spike in search volume for related terms."]).'
    ),
  confidenceLevel: z
    .enum(['Low', 'Medium', 'High'])
    .describe('The AI model\'s confidence in its prediction.'),
  targetAudienceSuggestion: z
    .string()
    .describe(
      'A brief description of the suggested target audience based on the data (e.g., "Tech enthusiasts aged 18-35", "Parents looking for educational toys").'
    ),
  locationAffinityDescription: z
    .string()
    .optional()
    .describe(
      'A textual description of any notable geographic patterns or affinities based on primaryTargetGeos and other data. This can inform heatmap data.'
    ),
});
export type ProductBuzzOutput = z.infer<typeof ProductBuzzOutputSchema>;

export async function predictProductBuzz(input: ProductAdDataInput): Promise<ProductBuzzOutput> {
  return productBuzzPredictionFlow(input);
}

const systemPrompt = `You are an expert Market Trend Analyst AI for an e-commerce intelligence platform called MarketScout.
Your primary goal is to analyze product and advertising data from various platforms (like TikTok, Facebook, Google Trends) to predict its "buzz" potential, identify relevant upcoming occasions, estimate peak demand periods, and provide actionable insights for e-commerce sellers.

You will be given data about a product or an advertisement. Based on this data, you must:
1.  **Calculate a Buzz Score (0-100)**: Higher scores indicate stronger buzz and trending potential. Consider factors like engagement rates (CTR, shares, likes, comments relative to views if available), sentiment, search volume increases, and alignment with current market conditions. A product with high engagement and rising search volume should score highly.
2.  **Identify Potential Occasions**: Based on product name, category, keywords, and current date (assume current date is around July-August 2024 for context if not specified), suggest relevant shopping occasions or events (e.g., "Back to School", "Halloween", "Christmas", "Summer Travel").
3.  **Predict Peak Demand Window**: Estimate when demand for this product is likely to peak. This could be a general period (e.g., "Q4") or a more specific timeframe (e.g., "Next 2-4 weeks").
4.  **Provide Key Insights**: List 2-3 actionable observations or reasons supporting your predictions. These should help a seller understand why the product is (or isn't) buzzing.
5.  **State Confidence Level**: Indicate your confidence (Low, Medium, High) in the overall prediction.
6.  **Suggest Target Audience**: Briefly describe the ideal customer profile.
7.  **Location Affinity (Optional)**: If primaryTargetGeos are provided, comment on any notable geographic patterns or if the data suggests particular strength in those areas. This will inform a heatmap.

Be analytical and data-driven in your reasoning. If some data points are missing, make reasonable inferences or state how missing data impacts your confidence.
The current date is approximately late July 2024. Consider this for seasonal relevance.
`;

const userPromptTemplate = `Analyze the following product/ad data:
Product Name: {{productName}}
Platform: {{platform}}
{{#if productId}}Product ID: {{productId}}{{/if}}
{{#if category}}Category: {{category}}{{/if}}
{{#if pricePoint}}Price Point: $${{pricePoint}}{{/if}}
Keywords: {{#each primaryKeywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Metrics:
{{#if views}}Views: {{views}}{{/if}}
{{#if clicks}}Clicks: {{clicks}}{{/if}}
{{#if shares}}Shares: {{shares}}{{/if}}
{{#if comments}}Comments: {{comments}}{{/if}}
{{#if likes}}Likes: {{likes}}{{/if}}
{{#if ctr}}CTR: {{ctr}}%{{/if}}
{{#if positiveSentimentScore}}Positive Sentiment Score: {{positiveSentimentScore}} (out of 1){{/if}}
{{#if searchVolumeIncrease}}Search Volume Increase (recent): {{searchVolumeIncrease}}%{{/if}}
{{#if daysActive}}Days Active/Monitored: {{daysActive}}{{/if}}

{{#if primaryTargetGeos}}
Primary Target Geographies: {{#each primaryTargetGeos}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/if}}

{{#if rawCommentSamples}}
Sample Comments:
{{#each rawCommentSamples}}
- "{{{this}}}"
{{/each}}
{{/if}}

{{#if additionalContext}}Additional Context: {{additionalContext}}{{/if}}

Based on this data, provide your analysis in the structured format requested.
Focus on identifying strong signals of emerging trends.
For the Buzz Score, explain your reasoning briefly within the Key Insights. For example, a high CTR and share rate for a new ad would be strong positive signals. Low engagement despite many views might be a negative signal.
For Peak Demand, consider typical lead times for e-commerce and the suggested occasions.
For Location Affinity, briefly describe if the buzz seems concentrated or widespread based on the geos, or if the product type has known geographic preferences.
`;

const productBuzzPredictPrompt = ai.definePrompt({
  name: 'productBuzzPredictPrompt',
  system: systemPrompt,
  input: { schema: ProductAdDataInputSchema },
  output: { schema: ProductBuzzOutputSchema },
  prompt: userPromptTemplate,
  config: {
    temperature: 0.3, // Slightly more deterministic for analysis
     safetySettings: [ // Adjust safety settings if generating marketing-related content
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
       {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  }
});

const productBuzzPredictionFlow = ai.defineFlow(
  {
    name: 'productBuzzPredictionFlow',
    inputSchema: ProductAdDataInputSchema,
    outputSchema: ProductBuzzOutputSchema,
  },
  async (input) => {
    // In a real scenario, you might add more logic here:
    // - Fetch more data from other sources based on productId
    // - Perform more complex calculations before calling the LLM
    // - Clean or transform input data

    const {output} = await productBuzzPredictPrompt(input);
    
    if (!output) {
      // Handle cases where the LLM might not return valid structured output
      // For simplicity, we'll throw an error or return a default.
      // In a production app, you might want more sophisticated error handling or retries.
      console.error("AI model did not return valid output for product buzz prediction.");
      throw new Error("Failed to get buzz prediction from AI model.");
      // Or, return a default/error structure:
      // return {
      //   buzzScore: 0,
      //   potentialOccasions: [],
      //   predictedPeakDemandWindow: "Uncertain",
      //   keyInsights: ["AI analysis failed or returned no data."],
      //   confidenceLevel: "Low",
      //   targetAudienceSuggestion: "Unknown",
      // };
    }
    
    return output;
  }
);

// Example of how you might call this flow (for testing, not for direct client-side use without a backend call)
/*
async function testFlow() {
  const sampleInput: ProductAdDataInput = {
    productId: "prod789",
    productName: "Portable Espresso Maker",
    platform: "TikTok",
    views: 2500000,
    clicks: 120000,
    shares: 30000,
    comments: 5000,
    likes: 200000,
    ctr: 4.8, // (120000 / 2500000) * 100
    positiveSentimentScore: 0.85,
    primaryKeywords: ["coffee", "travel", "gadget", "espresso", "outdoor"],
    primaryTargetGeos: ["USA", "Europe", "Australia"],
    daysActive: 14,
    category: "Kitchen Gadgets",
    pricePoint: 49.99,
    additionalContext: "Ad campaign features influencers using it while hiking and camping."
  };

  try {
    const result = await predictProductBuzz(sampleInput);
    console.log("Buzz Prediction Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error testing buzz prediction flow:", error);
  }
}

// testFlow(); // Uncomment to run a test when this file is executed directly (e.g., with tsx)
*/
