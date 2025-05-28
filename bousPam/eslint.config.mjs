import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default {
  eslintConfig,
  rules: {
    'react-hooks/exhaustive-deps': 'off', // Отключить правило для зависимостей useEffect
    '@typescript-eslint/no-unused-vars': 'off', // Отключить правило для неиспользуемых переменных
    '@typescript-eslint/no-explicit-any': 'off', // Отключить правило для использования типа any
    '@typescript-eslint/no-unused-expressions': 'off', // Отключить правило для неиспользуемых выражений
  },
};
