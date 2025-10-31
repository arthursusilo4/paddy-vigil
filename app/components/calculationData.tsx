/* File ini menyimpan data "kompleks" untuk ditampilkan.
  Kami menerjemahkan logika Python dari `EnhancedRicePestPredictor` 
  ke dalam deskripsi yang mudah dibaca dan pseudo-code.
*/

import React from 'react';

export interface CalculationDetails {
  name: string;
  sci_name: string;
  type: 'Hama' | 'Penyakit';
  description: string;
  formula: React.ReactNode;
  variables: { name: string; description: string }[];
  source: string;
}

// Komponen pembantu untuk styling formula
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
  // ==================== HAMA ====================

  brown_planthopper: {
    name: 'Wereng Coklat',
    sci_name: 'Nilaparvata lugens',
    type: 'Hama',
    description:
      'Risiko dihitung berdasarkan kesesuaian lingkungan, tahap pertumbuhan tanaman, dan kemajuan generasi berbasis GDD. Risiko meningkat selama musim hujan.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (JIKA <Var>temp</Var> 24-32°C MAKA <Val>1.0</Val>{' '}
          JIKA TIDAK <Val>0.3</Val>)
          <br />
          <Var>humidity_suit</Var> = (JIKA <Var>humidity</Var> {'>'} 80% MAKA{' '}
          <Val>1.0</Val> JIKA TIDAK <Val>0.5</Val>)
          <br />
          <Var>stage_suit</Var> = (JIKA <Var>stage</Var> adalah 'Vegetatif' atau
          'Reproduktif' MAKA <Val>1.0</Val> JIKA TIDAK <Val>0.3</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>bph_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>humidity_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.20</Val>) <Op>+</Op>{' '}
          (<Var>gen_progress</Var> <Op>*</Op> <Val>0.15</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Suhu rata-rata harian (°C).' },
      { name: 'humidity', description: 'Kelembaban relatif rata-rata harian (%).' },
      { name: 'stage', description: 'Tahap pertumbuhan padi saat ini.' },
      {
        name: 'bph_gen_progress',
        description:
          'Akumulasi GDD musiman % untuk Wereng Coklat (reset setiap musim).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source:
      'Model diturunkan dari logika calculate_bph_risk(), mengintegrasikan prinsip GDD dari thermal_params.',
  },

  yellow_stem_borer: {
    name: 'Penggerek Batang Kuning',
    sci_name: 'Scirpophaga incertulas',
    type: 'Hama',
    description:
      'Risiko didorong oleh suhu, curah hujan (penggerek lebih menyukai hujan sedikit), tahap pertumbuhan tanaman, dan kemajuan generasi berbasis GDD.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (JIKA <Var>temp</Var> 20-30°C MAKA <Val>1.0</Val>{' '}
          JIKA TIDAK <Val>0.4</Val>)
          <br />
          <Var>precip_suit</Var> = (JIKA <Var>precip</Var> {'>'} 30mm MAKA{' '}
          <Val>0.3</Val> JIKA TIDAK <Val>1.0</Val>)
          <br />
          <Var>stage_suit</Var> = (JIKA <Var>stage</Var> adalah 'Vegetatif' atau
          'Reproduktif' MAKA <Val>1.0</Val> JIKA TIDAK <Val>0.3</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>ysb_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>precip_suit</Var> <Op>*</Op> <Val>0.30</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.25</Val>){' '}
          <Op>+</Op> (<Var>gen_progress</Var> <Op>*</Op> <Val>0.15</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Suhu rata-rata harian (°C).' },
      { name: 'precip', description: 'Curah hujan harian (mm).' },
      { name: 'stage', description: 'Tahap pertumbuhan padi saat ini.' },
      {
        name: 'ysb_gen_progress',
        description:
          'Akumulasi GDD musiman % untuk Penggerek Batang Kuning (reset setiap musim).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source: 'Model diturunkan dari logika calculate_ysb_risk().',
  },

  rice_leaf_folder: {
    name: 'Penggulung Daun Padi',
    sci_name: 'Cnaphalocrocis medinalis',
    type: 'Hama',
    description:
      'Risiko tertinggi selama tahap vegetatif, disukai oleh kelembaban tinggi dan suhu sedang.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (JIKA <Var>temp</Var> 24-28°C MAKA <Val>1.0</Val>{' '}
          JIKA TIDAK <Val>0.5</Val>)
          <br />
          <Var>humidity_suit</Var> = (JIKA <Var>humidity</Var> {'>'} 85% MAKA{' '}
          <Val>1.0</Val> JIKA TIDAK <Val>0.6</Val>)
          <br />
          <Var>stage_suit</Var> = (JIKA <Var>stage</Var> adalah 'Vegetatif' MAKA{' '}
          <Val>1.0</Val> JIKA TIDAK <Val>0.7</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>humidity_suit</Var> <Op>*</Op> <Val>0.35</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.30</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Suhu rata-rata harian (°C).' },
      { name: 'humidity', description: 'Kelembaban relatif rata-rata harian (%).' },
      { name: 'stage', description: 'Tahap pertumbuhan padi saat ini.' },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source: 'Model diturunkan dari logika calculate_rlf_risk().',
  },

  rice_bug: {
    name: 'Kepinding Tanah',
    sci_name: 'Leptocorisa oratorius',
    type: 'Hama',
    description:
      'Risiko tertinggi selama tahap reproduktif dan kematangan (pengisian biji), karena hama ini memakan biji yang sedang berkembang.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (JIKA <Var>temp</Var> 24-32°C MAKA <Val>1.0</Val>{' '}
          JIKA TIDAK <Val>0.3</Val>)
          <br />
          <Var>stage_suit</Var> = (JIKA <Var>stage</Var> adalah 'Reproduktif' atau
          'Kematangan' MAKA <Val>1.0</Val> JIKA TIDAK <Val>0.1</Val>)
          <br />
          <Var>gen_progress</Var> = min(<Var>wst_gen_progress</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>temp_suit</Var> <Op>*</Op> <Val>0.40</Val>){' '}
          <Op>+</Op> (<Var>stage_suit</Var> <Op>*</Op> <Val>0.40</Val>){' '}
          <Op>+</Op> (<Var>gen_progress</Var> <Op>*</Op> <Val>0.20</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      { name: 'temp', description: 'Suhu rata-rata harian (°C).' },
      { name: 'stage', description: 'Tahap pertumbuhan padi saat ini.' },
      {
        name: 'wst_gen_progress',
        description:
          'Akumulasi GDD musiman % untuk Kepinding Tanah (reset setiap musim).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source: 'Model diturunkan dari logika calculate_rice_bug_risk().',
  },

  field_rat: {
    name: 'Tikus Sawah',
    sci_name: 'Rattus argentiventer',
    type: 'Hama',
    description:
      'Risiko didasarkan pada umur tanaman (perlindungan habitat) dan tahap pertumbuhan. Tidak bergantung pada cuaca harian tetapi pada pola musiman.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>age_factor</Var> = min(<Var>days_since_planting</Var> /{' '}
          <Val>100</Val>, <Val>1.0</Val>)
          <br />
          <Var>habitat_score</Var> = (JIKA <Var>stage</Var> adalah 'Vegetatif' atau
          'Reproduktif' MAKA <Val>0.7</Val> JIKA TIDAK <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>age_factor</Var> <Op>*</Op> <Val>0.5</Val>){' '}
          <Op>+</Op> (<Var>habitat_score</Var> <Op>*</Op> <Val>0.5</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'days_since_planting',
        description: 'Hari sejak musim tanam saat ini dimulai.',
      },
      {
        name: 'stage',
        description: 'Tahap pertumbuhan padi saat ini (memberikan perlindungan).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source: 'Model diturunkan dari logika calculate_field_rat_risk().',
  },

  golden_snail: {
    name: 'Keong Mas',
    sci_name: 'Pomacea canaliculata',
    type: 'Hama',
    description:
      'Risiko tertinggi pada tanaman muda (Hari < 30) dan di sawah dengan air menggenang (3-10 cm).',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Faktor Kesesuaian (0.0 - 1.0)</Comment>
          <Var>stage_suit</Var> = (JIKA <Var>days_since_planting</Var> {'<'} 30
          MAKA <Val>1.0</Val> JIKA TIDAK <Val>0.1</Val>)
          <br />
          <Var>water_suit</Var> = (JIKA <Var>water_depth_cm</Var> 3-10cm MAKA{' '}
          <Val>1.0</Val> JIKA TIDAK <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 2. Hitung Risiko Dasar Berbobot</Comment>
          <Var>base_risk</Var> = (<Var>stage_suit</Var> <Op>*</Op> <Val>0.6</Val>){' '}
          <Op>+</Op> (<Var>water_suit</Var> <Op>*</Op> <Val>0.4</Val>)
          <br />
          <br />
          <Comment>// 3. Terapkan Pengali Musiman</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>base_risk</Var> <Op>*</Op>{' '}
          <Val>100</Val>) <Op>*</Op> <Var>seasonal_mult</Var>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'days_since_planting',
        description: 'Hari sejak musim tanam saat ini dimulai.',
      },
      {
        name: 'water_depth_cm',
        description:
          'Kedalaman air simulasi (diasumsikan 5cm dalam model ini).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
    ],
    source: 'Model diturunkan dari logika calculate_golden_snail_risk().',
  },

  // ==================== PENYAKIT ====================

  rice_blast: {
    name: 'Blas Padi',
    sci_name: 'Pyricularia oryzae',
    type: 'Penyakit',
    description:
      'Tekanan penyakit (ADPI) terakumulasi berdasarkan skor risiko harian. Risiko harian didorong oleh durasi basah daun, suhu, dan kadar nitrogen.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Skor Risiko Harian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Kesesuaian puncak pada 18-28°C)
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
            // 2. Hitung ADPI (Indeks Tekanan Penyakit Terakumulasi, 0-100)
          </Comment>
          JIKA <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          JIKA <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Peluruhan)
          <br />
          JIKA TIDAK: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Peluruhan)
          <br />
          <Comment>
            // ADPI dibatasi hingga 100 dan direset ke 0 selama musim 'bera'
          </Comment>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'lwd_norm',
        description: 'Durasi Basah Daun Ternormalisasi (0.0 - 1.0).',
      },
      { name: 'vpd_index', description: 'Kesesuaian Defisit Tekanan Uap.' },
      { name: 'n_factor', description: 'Faktor Kerentanan Nitrogen.' },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
      {
        name: 'ADPI',
        description:
          'Indeks Tekanan Penyakit Terakumulasi. Meningkat pada hari berisiko tinggi, meluruh pada hari berisiko rendah.',
      },
    ],
    source:
      'Model diturunkan dari logika calculate_daily_disease_risk() dan calculate_adpi_realistic().',
  },

  bacterial_leaf_blight: {
    name: 'Hawar Daun Bakteri',
    sci_name: 'Xanthomonas oryzae pv. oryzae',
    type: 'Penyakit',
    description:
      'Tekanan penyakit (ADPI) terakumulasi berdasarkan risiko harian. Risiko harian didorong oleh curah hujan terkini (penyebaran), suhu, dan kelembaban.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Skor Risiko Harian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Kesesuaian puncak pada 25-30°C)
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
            // 2. Hitung ADPI (Indeks Tekanan Penyakit Terakumulasi, 0-100)
          </Comment>
          JIKA <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          JIKA <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Peluruhan)
          <br />
          JIKA TIDAK: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Peluruhan)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'rainfall_events_7d',
        description: 'Jumlah hari hujan ternormalisasi dalam 7 hari terakhir.',
      },
      { name: 'humidity_norm', description: 'Kelembaban ternormalisasi (0.0 - 1.0).' },
      { name: 'n_factor', description: 'Faktor Kerentanan Nitrogen.' },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
      {
        name: 'ADPI',
        description:
          'Indeks Tekanan Penyakit Terakumulasi. Meningkat pada hari berisiko tinggi, meluruh pada hari berisiko rendah.',
      },
    ],
    source:
      'Model diturunkan dari logika calculate_daily_disease_risk() dan calculate_adpi_realistic().',
  },

  sheath_blight: {
    name: 'Hawar Pelepah',
    sci_name: 'Rhizoctonia solani',
    type: 'Penyakit',
    description:
      'Tekanan penyakit (ADPI) terakumulasi berdasarkan risiko harian. Risiko harian sangat dipengaruhi oleh kelembaban tanah, penanaman rapat, dan suhu.',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Skor Risiko Harian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Kesesuaian puncak pada 25-32°C)
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
            // 2. Hitung ADPI (Indeks Tekanan Penyakit Terakumulasi, 0-100)
          </Comment>
          JIKA <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          JIKA <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Peluruhan)
          <br />
          JIKA TIDAK: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Peluruhan)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'soil_moisture_norm',
        description:
          'Kelembaban tanah ternormalisasi (disimulasikan dari kelembaban).',
      },
      {
        name: 'plant_density_norm',
        description:
          'Kepadatan tanaman ternormalisasi (disimulasikan, semakin tinggi = sirkulasi udara semakin sedikit).',
      },
      { name: 'humidity_norm', description: 'Kelembaban ternormalisasi (0.0 - 1.0).' },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
      {
        name: 'ADPI',
        description:
          'Indeks Tekanan Penyakit Terakumulasi. Meningkat pada hari berisiko tinggi, meluruh pada hari berisiko rendah.',
      },
      ],
    source:
      'Model diturunkan dari logika calculate_daily_disease_risk() dan calculate_adpi_realistic().',
  },

  brown_spot: {
    name: 'Bercak Coklat',
    sci_name: 'Helminthosporium oryzae',
    type: 'Penyakit',
    description:
      'Tekanan penyakit (ADPI) terakumulasi berdasarkan risiko harian. Penyakit ini sering dikaitkan dengan tanaman tua dan stres nutrisi (Kalium rendah).',
    formula: (
      <pre>
        <code>
          <Comment>// 1. Hitung Skor Risiko Harian (0.0 - 1.0)</Comment>
          <Var>temp_suit</Var> = (Kesesuaian puncak pada 25-28°C)
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
            // 2. Hitung ADPI (Indeks Tekanan Penyakit Terakumulasi, 0-100)
          </Comment>
          JIKA <Var>daily_risk</Var> {'>'} <Val>0.25</Val>:{' '}
          <Out>ADPI</Out> <Op>+=</Op> (<Var>daily_risk</Var> <Op>*</Op>{' '}
          <Val>40</Val>)
          <br />
          JIKA <Var>daily_risk</Var> {'<'} <Val>0.15</Val>:{' '}
          <Out>ADPI</Out> <Op>-=</Op> <Val>3</Val> (Peluruhan)
          <br />
          JIKA TIDAK: <Out>ADPI</Out> <Op>-=</Op> <Val>5</Val> (Peluruhan)
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'plant_age_factor',
        description: 'Umur tanaman ternormalisasi (tanaman tua lebih rentan).',
      },
      {
        name: 'lwd_norm',
        description: 'Durasi Basah Daun Ternormalisasi (0.0 - 1.0).',
      },
      {
        name: 'fertility_factor',
        description:
          'Faktor stres nutrisi (disimulasikan, berdasarkan Kalium rendah).',
      },
      {
        name: 'seasonal_mult',
        description: 'Faktor musim hujan (1.3 untuk musim basah, 0.6 untuk musim kering).',
      },
      {
        name: 'ADPI',
        description:
          'Indeks Tekanan Penyakit Terakumulasi. Meningkat pada hari berisiko tinggi, meluruh pada hari berisiko rendah.',
      },
    ],
    source:
      'Model diturunkan dari logika calculate_daily_disease_risk() dan calculate_adpi_realistic().',
  },

  tungro: {
    name: 'Virus Tungro',
    sci_name: 'RTBV + RTSV (melalui Wereng Hijau)',
    type: 'Penyakit',
    description:
      'Risiko tungro dihitung berdasarkan kemajuan generasi vektor (Wereng Hijau) dan jendela transmisi berisiko tinggi tanaman (20-60 hari).',
    formula: (
      <pre>
        <code>
          <Comment>
            // 1. Hitung Kemajuan Generasi Vektor (WHD) (0-200%)
          </Comment>
          <Var>glh_daily_gdd</Var> = (GDD dihitung harian untuk vektor)
          <br />
          <Var>glh_gdd_cumulative</Var> = (Terakumulasi secara musiman, mirip dengan
          hama)
          <br />
          <Var>vector_gen_progress</Var> = (<Var>glh_gdd_cumulative</Var> /{' '}
          <Val>240</Val>) <Op>*</Op> <Val>100</Val>
          <br />
          <br />
          <Comment>// 2. Hitung Kerentanan Tanaman (0.0 - 1.0)</Comment>
          <Var>transmission_window</Var> = (JIKA <Var>days_since_planting</Var>{' '}
          20-60 MAKA <Val>1.0</Val> JIKA TIDAK <Val>0.1</Val>)
          <br />
          <br />
          <Comment>// 3. Hitung Risiko Akhir</Comment>
          <Out>RISIKO_AKHIR_PCT</Out> = (<Var>vector_gen_progress</Var> /{' '}
          <Val>100</Val>) <Op>*</Op> <Var>transmission_window</Var> <Op>*</Op>{' '}
          <Val>100</Val>
        </code>
      </pre>
    ),
    variables: [
      {
        name: 'vector_gen_progress',
        description:
          'Kemajuan generasi berbasis GDD dari vektor Wereng Hijau.',
      },
      {
        name: 'transmission_window',
        description:
          'Faktor kerentanan tanaman, puncaknya pada 20-60 hari setelah tanam.',
      },
    ],
    source:
      'Model diturunkan dari logika perhitungan tungro_risk, menggunakan prinsip GDD untuk vektor.',
  },
};