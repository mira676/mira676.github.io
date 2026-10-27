/* Chinese display names first; keep the existing order inside each group. */
(() => {
  const hasChinese = name => /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/u.test(name);
  const orderGrid = grid => {
    const cards = Array.from(grid.children).filter(node => node.matches('.card'));
    const ordered = cards.map((node, index) => ({node, index, chinese: hasChinese(node.querySelector('b')?.textContent || '')}))
      .sort((a, b) => Number(b.chinese) - Number(a.chinese) || a.index - b.index)
      .map(item => item.node);
    if (ordered.some((node, index) => node !== cards[index])) {
      ordered.forEach(node => grid.appendChild(node));
    }
    ordered.forEach((node, index) => {
      const rank = node.querySelector('.rank');
      const label = String(index + 1).padStart(2, '0');
      if (rank && rank.textContent !== label) rank.textContent = label;
    });
  };
  document.querySelectorAll('.grid').forEach(grid => {
    orderGrid(grid);
    new MutationObserver(() => orderGrid(grid)).observe(grid, {childList: true});
  });
})();
