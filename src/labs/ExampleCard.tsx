export default function ExampleCard() {
  const cards: { title: string; desc: string }[] = [
    { title: '화면 목록', desc: '왼쪽에서 컴포넌트를 골라보세요.' },
    { title: '자동 등록', desc: '파일을 추가하면 목록에 바로 나타납니다.' },
    { title: '셀프 테스트', desc: 'React를 몰라도 화면에서 바로 확인합니다.' },
  ]

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-4 text-2xl font-bold">React Lab에 오신 것을 환영합니다</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-2 font-semibold">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}