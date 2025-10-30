/* This file stores the "complex" data for display.
  We translate the Python logic from `EnhancedRicePestPredictor` 
  into human-readable descriptions and pseudo-code.
*/

import React from 'react';

export interface CalculationDetails {
  name: string;
  sci_name: string;
  type: 'Pest' | 'Disease';
  description: string;
  formula: React.ReactNode;
  variables: { name: string; description: string }[];
  source: string;
}

// Helper component for formula styling
const Var = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-300">{children}</span>
);
const Val = ({ children }: { children: React.ReactNode }) => (
  <span className="text-amber-300">{children}</span>
);
const Out = ({ children }: { children: React.ReactNode }) => (
  <span className="text-green-300">{children}</span>
);
const Op = ({ children }: { children: React.ReactNode }) => (
  <span className="text-pink-400">{children}</span>
);
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-slate-400 block">{children}</span>
);

export const calculationData: Record<string, CalculationDetails> = {
  // ==================== PESTS ====================

  brown_planthopper: {
    name: 'Brown Planthopper',
    sci_name: 'Nilaparvata lugens',
    type: 'Pest',
    description:
      'Risk is calculated based on environmental suitability, crop stage, and GDD-based generation progress. Risk is amplified during the wet season.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (IF <Var>temp</Var> 24-32°C THEN <Val>1.0</Val>{' '}
          ELSE <Val>0.3</Val>)
          <br />
          <Var>humidity_suit</Var> = (IF <Var>humidity</Var> {'>'} 80% THEN{' '}
          <Val>1.0</Val> ELSE <Val>0.5</Val>)
          <br />
          <Var>stage_suit</Var> = (IF <Var>stage</Var> is 'Vegetative' or
          'Reproductive' THEN <Val>1.0</Val> ELSE <Val>0.3</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>bph_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>humidity_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.20</Val>) <Op>+</Op>{' '}
          (<Var>gen_progress</Var> <Op>*</Op> <Val>0.15</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Daily average temperature (°C).' },
      { name: 'humidity', description: 'Daily average relative humidity (%).' },
      { name: 'stage', description: 'Current rice growth stage.' },
      {
        name: 'bph_gen_progress',
        description:
          'Seasonal GDD accumulation % for BPH (resets each season).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source:
      'Model derived from calculate_bph_risk() logic, integrating GDD principles from thermal_params.',
  },

  yellow_stem_borer: {
    name: 'Yellow Stem Borer',
    sci_name: 'Scirpophaga incertulas',
    type: 'Pest',
    description:
      'Risk is driven by temperature, precipitation (borers prefer less rain), crop stage, and GDD-based generation progress.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (IF <Var>temp</Var> 20-30°C THEN <Val>1.0</Val>{' '}
          ELSE <Val>0.4</Val>)
          <br />
          <Var>precip_suit</Var> = (IF <Var>precip</Var> {'>'} 30mm THEN{' '}
          <Val>0.3</Val> ELSE <Val>1.0</Val>)
          <br />
          <Var>stage_suit</Var> = (IF <Var>stage</Var> is 'Vegetative' or
          'Reproductive' THEN <Val>1.0</Val> ELSE <Val>0.3</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>ysb_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>precip_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.25</Val>){' '}
          <Op>+</Op> (<Var>gen_progress</Var> <Op>*</Op> <Val>0.15</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Daily average temperature (°C).' },
      { name: 'precip', description: 'Daily precipitation (mm).' },
      { name: 'stage', description: 'Current rice growth stage.' },
      {
        name: 'ysb_gen_progress',
        description:
          'Seasonal GDD accumulation % for YSB (resets each season).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source: 'Model derived from calculate_ysb_risk() logic.',
  },

  rice_leaf_folder: {
    name: 'Rice Leaf Folder',
    sci_name: 'Cnaphalocrocis medinalis',
    type: 'Pest',
    description:
      'Risk is highest during the vegetative stage, favored by high humidity and moderate temperatures.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (IF <Var>temp</Var> 24-28°C THEN <Val>1.0</Val>{' '}
          ELSE <Val>0.5</Val>)
          <br />
          <Var>humidity_suit</Var> = (IF <Var>humidity</Var> {'>'} 85% THEN{' '}
          <Val>1.0</Val> ELSE <Val>0.6</Val>)
          <br />
          <Var>stage_suit</Var> = (IF <Var>stage</Var> is 'Vegetative' THEN{' '}
          <Val>1.0</Val> ELSE <Val>0.7</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>humidity_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.30</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Daily average temperature (°C).' },
      { name: 'humidity', description: 'Daily average relative humidity (%).' },
      { name: 'stage', description: 'Current rice growth stage.' },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source: 'Model derived from calculate_rlf_risk() logic.',
  },

  rice_bug: {
    name: 'Rice Bug',
    sci_name: 'Leptocorisa oratorius',
    type: 'Pest',
    description:
      'Risk is highest during reproductive and maturity (milking) stages, as the pest feeds on developing grains.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (IF <Var>temp</Var> 24-32°C THEN <Val>1.0</Val>{' '}
          ELSE <Val>0.3</Val>)
          <br />
          <Var>stage_suit</Var> = (IF <Var>stage</Var> is 'Reproductive' or
          'Maturity' THEN <Val>1.0</Val> ELSE <Val>0.1</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>wst_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.40</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.40</Val>){' '}
          <Op>+</Op> (<Var>gen_progress</Var> <Op>*</Op> <Val>0.20</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Daily average temperature (°C).' },
      { name: 'stage', description: 'Current rice growth stage.' },
      {
        name: 'wst_gen_progress',
        description:
          'Seasonal GDD accumulation % for Rice Bug (resets each season).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source: 'Model derived from calculate_rice_bug_risk() logic.',
  },

  field_rat: {
    name: 'Field Rat',
    sci_name: 'Rattus argentiventer',
    type: 'Pest',
    description:
      'Risk is based on crop age (habitat cover) and growth stage. It is not dependent on daily weather but on seasonal patterns.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>age_factor</Var> = min(<Var>days_since_planting</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <Var>habitat_score</Var> = (IF <Var>stage</Var> is 'Vegetative' or
          'Reproductive' THEN <Val>0.7</Val> ELSE <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>age_factor</Var> <Op>*</Op> <Val>0.5</Val>){' '}
          <Op>+</Op> (<Var>habitat_score</Var> <Op>*</Op> <Val>0.5</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'days_since_planting',
        description: 'Days since the current growing season started.',
      },
      {
        name: 'stage',
        description: 'Current rice growth stage (provides cover).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source: 'Model derived from calculate_field_rat_risk() logic.',
  },

  golden_snail: {
    name: 'Golden Snail',
    sci_name: 'Pomacea canaliculata',
    type: 'Pest',
    description:
      'Risk is highest in young plants (Days < 30) and in fields with standing water (3-10 cm).',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Suitability Factors (0.0 - 1.0)</Comment>
          <Var>stage_suit</Var> = (IF <Var>days_since_planting</Var> {'<'} 30
          THEN <Val>1.0</Val> ELSE <Val>0.1</Val>)
          <br />
          <Var>water_suit</Var> = (IF <Var>water_depth_cm</Var> 3-10cm THEN{' '}
          <Val>1.0</Val> ELSE <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 2. Calculate Weighted Base Risk</Comment>
          <Var>base_risk</Var> = (<Var>stage_suit</Var> <Op>*</Op> <Val>0.6</Val>){' '}
          <Op>+</Op> (<Var>water_suit</Var> <Op>*</Op> <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 3. Apply Seasonal Multiplier</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'days_since_planting',
        description: 'Days since the current growing season started.',
      },
      {
        name: 'water_depth_cm',
        description:
          'Simulated water depth (assumed 5cm in this model).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
    ],
    source: 'Model derived from calculate_golden_snail_risk() logic.',
  },

  // ==================== DISEASES ====================

  rice_blast: {
    name: 'Rice Blast',
    sci_name: 'Pyricularia oryzae',
    type: 'Disease',
    description:
      'Disease pressure (ADPI) accumulates based on daily risk scores. Daily risk is driven by leaf wetness, temperature, and nitrogen levels.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Daily Risk Score (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Peak favorability at 18-28°C)
          <br />
          <Var>daily_risk</Var> = (<Var>lwd_norm</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>temp_suit</Var> <Op>*</Op> <Val>0.25</Val>){' '}
          <Op>+</Op> (<Var>vpd_index</Var> <Op>*</Op> <Val>0.20</Val>){' '}
          <Op>+</Op> (<Var>n_factor</Var> <Op>*</Op> <Val>0.15</Val>)
          <br />
          <Var>daily_risk</Var> = <Var>daily_risk</Var> <Op>*</Op>{' '}
          <Var>seasonal_mult</Var>
          <br />
          <br />
          <Comment>
            // 2. Calculate ADPI (Accumulated Disease Pressure Index, 0-100)
          </Comment>
          IF <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          IF <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Decay)
          <br />
          ELSE: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Decay)
          <br />
          <Comment>
            // ADPI is capped at 100 and resets to 0 during 'fallow' season
          </Comment>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'lwd_norm',
        description: 'Normalized Leaf Wetness Duration (0.0 - 1.0).',
      },
      { name: 'vpd_index', description: 'Vapor Pressure Deficit favorability.' },
      { name: 'n_factor', description: 'Nitrogen Susceptibility Factor.' },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
      {
        name: 'ADPI',
        description:
          'Accumulated Disease Pressure Index. Builds up on high-risk days, decays on low-risk days.',
      },
    ],
    source:
      'Model derived from calculate_daily_disease_risk() and calculate_adpi_realistic() logic.',
  },

  bacterial_leaf_blight: {
    name: 'Bacterial Leaf Blight',
    sci_name: 'Xanthomonas oryzae pv. oryzae',
    type: 'Disease',
    description:
      'Disease pressure (ADPI) accumulates based on daily risk. Daily risk is driven by recent rainfall (spreading), temperature, and humidity.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Daily Risk Score (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Peak favorability at 25-30°C)
          <br />
          <Var>daily_risk</Var> = (<Var>rainfall_events_7d</Var> <Op>*</Op>{' '}
          <Val>0.35</Val>) <Op>+</Op> (<Var>temp_suit</Var> <Op>*</Op>{' '}
          <Val>0.25</Val>) <Op>+</Op> (<Var>humidity_norm</Var> <Op>*</Op>{' '}
          <Val>0.20</Val>) <Op>+</Op> (<Var>n_factor</Var> <Op>*</Op>{' '}
          <Val>0.15</Val>)
          <br />
          <Var>daily_risk</Var> = <Var>daily_risk</Var> <Op>*</Op>{' '}
          <Var>seasonal_mult</Var>
          <br />
          <br />
          <Comment>
            // 2. Calculate ADPI (Accumulated Disease Pressure Index, 0-100)
          </Comment>
          IF <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          IF <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Decay)
          <br />
          ELSE: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Decay)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'rainfall_events_7d',
        description: 'Normalized count of rain days in the last 7 days.',
      },
      { name: 'humidity_norm', description: 'Normalized humidity (0.0 - 1.0).' },
      { name: 'n_factor', description: 'Nitrogen Susceptibility Factor.' },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
      {
        name: 'ADPI',
        description:
          'Accumulated Disease Pressure Index. Builds up on high-risk days, decays on low-risk days.',
      },
    ],
    source:
      'Model derived from calculate_daily_disease_risk() and calculate_adpi_realistic() logic.',
  },

  sheath_blight: {
    name: 'Sheath Blight',
    sci_name: 'Rhizoctonia solani',
    type: 'Disease',
    description:
      'Disease pressure (ADPI) accumulates based on daily risk. Daily risk is heavily influenced by soil moisture, dense planting, and temperature.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Daily Risk Score (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Peak favorability at 25-32°C)
          <br />
          <Var>daily_risk</Var> = (<Var>soil_moisture_norm</Var> <Op>*</Op>{' '}
          <Val>0.40</Val>) <Op>+</Op> (<Var>temp_suit</Var> <Op>*</Op>{' '}
          <Val>0.25</Val>) <Op>+</Op> (<Var>plant_density_norm</Var> <Op>*</Op>{' '}
          <Val>0.20</Val>) <Op>+</Op> (<Var>humidity_norm</Var> <Op>*</Op>{' '}
          <Val>0.15</Val>)
          <br />
          <Var>daily_risk</Var> = <Var>daily_risk</Var> <Op>*</Op>{' '}
          <Var>seasonal_mult</Var>
          <br />
          <br />
          <Comment>
            // 2. Calculate ADPI (Accumulated Disease Pressure Index, 0-100)
          </Comment>
          IF <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          IF <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Decay)
          <br />
          ELSE: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Decay)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'soil_moisture_norm',
        description:
          'Normalized soil moisture (simulated from humidity).',
      },
      {
        name: 'plant_density_norm',
        description:
          'Normalized plant density (simulated, higher = less airflow).',
      },
      { name: 'humidity_norm', description: 'Normalized humidity (0.0 - 1.0).' },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
      {
        name: 'ADPI',
        description:
          'Accumulated Disease Pressure Index. Builds up on high-risk days, decays on low-risk days.',
      },
    ],
    source:
      'Model derived from calculate_daily_disease_risk() and calculate_adpi_realistic() logic.',
  },

  brown_spot: {
    name: 'Brown Spot',
    sci_name: 'Helminthosporium oryzae',
    type: 'Disease',
    description:
      'Disease pressure (ADPI) accumulates based on daily risk. This disease is often linked to older plants and nutrient stress (low Potassium).',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Calculate Daily Risk Score (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Peak favorability at 25-28°C)
          <br />
          <Var>daily_risk</Var> = (<Var>plant_age_factor</Var> <Op>*</Op>{' '}
          <Val>0.30</Val>) <Op>+</Op> (<Var>lwd_norm</Var> <Op>*</Op>{' '}
          <Val>0.25</Val>) <Op>+</Op> (<Var>temp_suit</Var> <Op>*</Op>{' '}
          <Val>0.20</Val>) <Op>+</Op> (<Var>fertility_factor</Var> <Op>*</Op>{' '}
          <Val>0.15</Val>)
          <br />
          <Var>daily_risk</Var> = <Var>daily_risk</Var> <Op>*</Op>{' '}
          <Var>seasonal_mult</Var>
          <br />
          <br />
          <Comment>
            // 2. Calculate ADPI (Accumulated Disease Pressure Index, 0-100)
          </Comment>
          IF <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          IF <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Decay)
          <br />
          ELSE: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Decay)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'plant_age_factor',
        description: 'Normalized plant age (older plants are more susceptible).',
      },
      {
        name: 'lwd_norm',
        description: 'Normalized Leaf Wetness Duration (0.0 - 1.0).',
      },
      {
        name: 'fertility_factor',
        description:
          'Nutrient stress factor (simulated, based on low Potassium).',
      },
      {
        name: 'seasonal_mult',
        description: 'Monsoon factor (1.3 for wet, 0.6 for dry season).',
      },
      {
        name: 'ADPI',
        description:
          'Accumulated Disease Pressure Index. Builds up on high-risk days, decays on low-risk days.',
      },
    ],
    source:
      'Model derived from calculate_daily_disease_risk() and calculate_adpi_realistic() logic.',
  },

  tungro: {
    name: 'Tungro Virus',
    sci_name: 'RTBV + RTSV (via Green Leafhopper)',
    type: 'Disease',
    description:
      'Tungro risk is calculated based on the vector (Green Leafhopper) generation progress and the plant a high-risk transmission window (20-60 days).',
    formula: (
      <pre>
        <code>
          <Comment>
            // 1. Calculate Vector (GLH) Generation Progress (0-200%)
          </Comment>
          <Var>glh_daily_gdd</Var> = (GDD calculated daily for vector)
          <br />
          <Var>glh_gdd_cumulative</Var> = (Accumulates seasonally, similar to
          pests)
          <br />
          <Var>vector_gen_progress</Var> = (<Var>glh_gdd_cumulative</Var> /{' '}
          <Val>240</Val>) <Op>*</Op> <Val>100</Val>
          <br />
          <br />
          <Comment>// 2. Calculate Plant Susceptibility (0.0 - 1.0)</Comment>
          <Var>transmission_window</Var> = (IF <Var>days_since_planting</Var>{' '}
          20-60 THEN <Val>1.0</Val> ELSE <Val>0.1</Val>)
          <br />
          <br />
          <Comment>// 3. Calculate Final Risk</Comment>
          <Out>FINAL_RISK_PCT</Out> = (<Var>vector_gen_progress</Var> /{' '}
          <Val>100</Val>) <Op>*</Op> <Var>transmission_window</Var> <Op>*</Op>{' '}
          <Val>100</Val>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'vector_gen_progress',
        description:
          'GDD-based generation progress of the Green Leafhopper vector.',
      },
      {
        name: 'transmission_window',
        description:
          'Plant susceptibility factor, peaking at 20-60 days after planting.',
      },
    ],
    source:
      'Model derived from tungro_risk calculation logic, using GDD principles for the vector.',
  },
};