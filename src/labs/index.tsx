// 자동 감지: src/labs 아래 모든 .tsx 파일을 목록으로 만든다.
// default export가 있는 파일만 노출한다(없으면 지원용 파일이므로 목록에서 숨김).
// ExampleCard.tsx는 항상 맨 위에 배치한다.
// 이 파일은 임의로 수정하지 않는다.

import type { ComponentType } from 'react'

type LabModule = { default: ComponentType }

const modules = import.meta.glob<LabModule>('./**/*.tsx', { eager: true })

export interface LabItem {
  path: string
  name: string
  readonly Component: ComponentType
}

export const labItems: LabItem[] = Object.keys(modules)
  .filter((path) => path !== './index.tsx')
  .filter((path) => Boolean(modules[path].default))
  .map((path) => ({
    path,
    name: path
      .replace(/^\.\//, '')
      .replace(/\.tsx$/, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
    Component: modules[path].default,
  }))
  .sort((a, b) => {
    const aTop = a.path === './ExampleCard.tsx' ? 0 : 1
    const bTop = b.path === './ExampleCard.tsx' ? 0 : 1
    if (aTop !== bTop) return aTop - bTop
    return a.name.localeCompare(b.name)
  })