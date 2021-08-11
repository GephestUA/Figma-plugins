figma.showUI(__html__);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'BarChart') {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });

    let { countColumns, minValue, maxValue, columnWidth } = msg;
    let chartWidth = columnWidth * countColumns + 50 * countColumns;
    const step = String(maxValue).length === 3 ? 50 : 100;
    const numberOfLabel = Math.ceil(maxValue / step);

    maxValue = Number.isInteger(maxValue / step) ? maxValue : step * numberOfLabel;

    const baseRect = figma.createRectangle();
    baseRect.resize(chartWidth, maxValue);
    baseRect.opacity = 0.2;
    baseRect.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 0.2 } }];

    const group = figma.group([baseRect], figma.currentPage);

    // Create Bar
    for (let i = 0; i < countColumns; i++) {
      let rect = figma.createRectangle();
      const rectHight = getRandomInt(minValue, maxValue);
      console.log(rectHight);

      rect.resize(columnWidth, rectHight);
      rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      rect.x = i * (columnWidth + 50) + 50 / 2;
      rect.y = maxValue - rectHight;
      group.appendChild(rect);
    }

    let label = 0;
    let horizontalGrids = 0;
    let verticalGrids = 0;

    for (let i = 0; i <= numberOfLabel; i++) {
      // Create Label Y
      const labels = figma.createText();
      if (i === 0) {
        labels.y = group.y + maxValue - Number(label);
        label = 0;
        // Create horizontal grid
        horizontalGrids += 0;
      } else {
        label += step;
        horizontalGrids += step;
      }
      // Create Label Y
      labels.characters = String(label);
      labels.x = String(maxValue).length * -8;
      labels.y = group.y + maxValue - Number(label) - 5;

      labels.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      labels.fontSize = 10;
      group.appendChild(labels);

      // Create horizontal grid
      const horizontalGrid = figma.createLine();
      horizontalGrid.resize(chartWidth, 0);
      horizontalGrid.y = horizontalGrids;
      group.appendChild(horizontalGrid);
    }

    for (let i = 0; i < countColumns + 1; i++) {
      // Create vertical grid
      const verticalGrid = figma.createRectangle();
      verticalGrid.name = 'verticalGrid';
      verticalGrid.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      verticalGrid.resize(1, maxValue);
      if (i === 0) {
        verticalGrid.x = verticalGrids;
      } else {
        verticalGrids += columnWidth + 50;
        verticalGrid.x = verticalGrids;
      }

      group.appendChild(verticalGrid);
    }
  }
};