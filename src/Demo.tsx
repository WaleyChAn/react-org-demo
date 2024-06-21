import React, { useRef, useEffect } from 'react'
import { demoData } from './DemoData2'

const Demo = () => {
  const refGraphCanvas = useRef<HTMLCanvasElement>(null)

  let canvasCtx: any = useRef(null)

  // 画布参数
  const canvasConfig = {
    width: 1800,
    height: 600,
  }

  // 节点参数
  const nodeConfig = {
    width: 40,
    height: 40,
    paddingX: 10,
    paddingY: 40,
  }

  // 鼠标位置
  const mousePosition = {
    offset: {
      x: 0,
      y: 0,
    },
    last: {
      x: 0,
      y: 0,
    },
    current: {
      x: 0,
      y: 0,
    },
  }

  // 画布缩放参数
  const canvasScale = {
    mousePosition: { x: 0, y: 0 },
    maxScale: 8,
    minScale: 0.4,
    scaleStep: 0.2,
    scale: 1,
    preScale: 1,
  }

  // 节点数据
  // const staticJsonData = {
  //   rootId: 'a',
  //   nodes: [
  //     { id: 'a', text: 'a' },
  //     { id: 'b', text: 'b' },
  //     { id: 'b1', text: 'b1' },
  //     { id: 'b1-1', text: 'b1-1' },
  //     { id: 'b1-2', text: 'b1-2' },
  //     { id: 'b1-3', text: 'b1-3' },
  //     { id: 'b1-4', text: 'b1-4' },
  //     { id: 'b1-5', text: 'b1-5' },
  //     { id: 'b1-6', text: 'b1-6' },
  //     { id: 'b2', text: 'b2' },
  //     { id: 'b2-1', text: 'b2-1' },
  //     { id: 'b2-2', text: 'b2-2' },
  //     { id: 'b2-3', text: 'b2-3' },
  //     { id: 'b2-4', text: 'b2-4' },
  //     { id: 'b3', text: 'b3' },
  //     { id: 'b3-1', text: 'b3-1' },
  //     { id: 'b3-2', text: 'b3-2' },
  //     { id: 'b3-3', text: 'b3-3' },
  //     { id: 'b3-4', text: 'b3-4' },
  //     { id: 'b3-5', text: 'b3-5' },
  //     { id: 'b3-6', text: 'b3-6' },
  //     { id: 'b3-7', text: 'b3-7' },
  //     { id: 'b4', text: 'b4' },
  //     { id: 'b4-1', text: 'b4-1' },
  //     { id: 'b4-2', text: 'b4-2' },
  //     { id: 'b4-3', text: 'b4-3' },
  //     { id: 'b4-4', text: 'b4-4' },
  //     { id: 'b4-5', text: 'b4-5' },
  //     { id: 'b4-6', text: 'b4-6' },
  //     { id: 'b4-7', text: 'b4-7' },
  //     { id: 'b4-8', text: 'b4-8' },
  //     { id: 'b4-9', text: 'b4-9' },
  //     { id: 'b5', text: 'b5' },
  //     { id: 'b5-1', text: 'b5-1' },
  //     { id: 'b5-2', text: 'b5-2' },
  //     { id: 'b5-3', text: 'b5-3' },
  //     { id: 'b5-4', text: 'b5-4' },
  //     { id: 'b6', text: 'b6' },
  //     { id: 'b6-1', text: 'b6-1' },
  //     { id: 'b6-2', text: 'b6-2' },
  //     { id: 'b6-3', text: 'b6-3' },
  //     { id: 'b6-4', text: 'b6-4' },
  //     { id: 'b6-5', text: 'b6-5' },
  //     { id: 'c', text: 'c' },
  //     { id: 'c1', text: 'c1' },
  //     { id: 'c1-1', text: 'c1-1' },
  //     { id: 'c1-2', text: 'c1-2' },
  //     { id: 'c1-3', text: 'c1-3' },
  //     { id: 'c1-4', text: 'c1-4' },
  //     { id: 'c1-5', text: 'c1-5' },
  //     { id: 'c1-6', text: 'c1-6' },
  //     { id: 'c1-7', text: 'c1-7' },
  //     { id: 'c2', text: 'c2' },
  //     { id: 'c2-1', text: 'c2-1' },
  //     { id: 'c2-2', text: 'c2-2' },
  //     { id: 'c3', text: 'c3' },
  //     { id: 'c3-1', text: 'c3-1' },
  //     { id: 'c3-2', text: 'c3-2' },
  //     { id: 'c3-3', text: 'c3-3' },
  //     { id: 'd', text: 'd' },
  //     { id: 'd1', text: 'd1' },
  //     { id: 'd1-1', text: 'd1-1' },
  //     { id: 'd1-2', text: 'd1-2' },
  //     { id: 'd1-3', text: 'd1-3' },
  //     { id: 'd1-4', text: 'd1-4' },
  //     { id: 'd1-5', text: 'd1-5' },
  //     { id: 'd1-6', text: 'd1-6' },
  //     { id: 'd1-7', text: 'd1-7' },
  //     { id: 'd1-8', text: 'd1-8' },
  //     { id: 'd2', text: 'd2' },
  //     { id: 'd2-1', text: 'd2-1' },
  //     { id: 'd2-2', text: 'd2-2' },
  //     { id: 'd3', text: 'd3' },
  //     { id: 'd3-1', text: 'd3-1' },
  //     { id: 'd3-2', text: 'd3-2' },
  //     { id: 'd3-3', text: 'd3-3' },
  //     { id: 'd3-4', text: 'd3-4' },
  //     { id: 'd3-5', text: 'd3-5' },
  //     { id: 'd4', text: 'd4' },
  //     { id: 'd4-1', text: 'd4-1' },
  //     { id: 'd4-2', text: 'd4-2' },
  //     { id: 'd4-3', text: 'd4-3' },
  //     { id: 'd4-4', text: 'd4-4' },
  //     { id: 'd4-5', text: 'd4-5' },
  //     { id: 'd4-6', text: 'd4-6' },
  //     { id: 'e', text: 'e' },
  //     { id: 'e1', text: 'e1' },
  //     { id: 'e1-1', text: 'e1-1' },
  //     { id: 'e1-2', text: 'e1-2' },
  //     { id: 'e1-3', text: 'e1-3' },
  //     { id: 'e1-4', text: 'e1-4' },
  //     { id: 'e1-5', text: 'e1-5' },
  //     { id: 'e1-6', text: 'e1-6' },
  //     { id: 'e2', text: 'e2' },
  //     { id: 'e2-1', text: 'e2-1' },
  //     { id: 'e2-2', text: 'e2-2' },
  //     { id: 'e2-3', text: 'e2-3' },
  //     { id: 'e2-4', text: 'e2-4' },
  //     { id: 'e2-5', text: 'e2-5' },
  //     { id: 'e2-6', text: 'e2-6' },
  //     { id: 'e2-7', text: 'e2-7' },
  //     { id: 'e2-8', text: 'e2-8' },
  //     { id: 'e2-9', text: 'e2-9' },
  //   ],
  //   lines: [
  //     { from: 'a', to: 'b' },
  //     { from: 'b', to: 'b1' },
  //     { from: 'b1', to: 'b1-1' },
  //     { from: 'b1', to: 'b1-2' },
  //     { from: 'b1', to: 'b1-3' },
  //     { from: 'b1', to: 'b1-4' },
  //     { from: 'b1', to: 'b1-5' },
  //     { from: 'b1', to: 'b1-6' },
  //     { from: 'b', to: 'b2' },
  //     { from: 'b2', to: 'b2-1' },
  //     { from: 'b2', to: 'b2-2' },
  //     { from: 'b2', to: 'b2-3' },
  //     { from: 'b2', to: 'b2-4' },
  //     { from: 'b', to: 'b3' },
  //     { from: 'b3', to: 'b3-1' },
  //     { from: 'b3', to: 'b3-2' },
  //     { from: 'b3', to: 'b3-3' },
  //     { from: 'b3', to: 'b3-4' },
  //     { from: 'b3', to: 'b3-5' },
  //     { from: 'b3', to: 'b3-6' },
  //     { from: 'b3', to: 'b3-7' },
  //     { from: 'b', to: 'b4' },
  //     { from: 'b4', to: 'b4-1' },
  //     { from: 'b4', to: 'b4-2' },
  //     { from: 'b4', to: 'b4-3' },
  //     { from: 'b4', to: 'b4-4' },
  //     { from: 'b4', to: 'b4-5' },
  //     { from: 'b4', to: 'b4-6' },
  //     { from: 'b4', to: 'b4-7' },
  //     { from: 'b4', to: 'b4-8' },
  //     { from: 'b4', to: 'b4-9' },
  //     { from: 'b', to: 'b5' },
  //     { from: 'b5', to: 'b5-1' },
  //     { from: 'b5', to: 'b5-2' },
  //     { from: 'b5', to: 'b5-3' },
  //     { from: 'b5', to: 'b5-4' },
  //     { from: 'b', to: 'b6' },
  //     { from: 'b6', to: 'b6-1' },
  //     { from: 'b6', to: 'b6-2' },
  //     { from: 'b6', to: 'b6-3' },
  //     { from: 'b6', to: 'b6-4' },
  //     { from: 'b6', to: 'b6-5' },
  //     { from: 'a', to: 'c' },
  //     { from: 'c', to: 'c1' },
  //     { from: 'c1', to: 'c1-1' },
  //     { from: 'c1', to: 'c1-2' },
  //     { from: 'c1', to: 'c1-3' },
  //     { from: 'c1', to: 'c1-4' },
  //     { from: 'c1', to: 'c1-5' },
  //     { from: 'c1', to: 'c1-6' },
  //     { from: 'c1', to: 'c1-7' },
  //     { from: 'c', to: 'c2' },
  //     { from: 'c2', to: 'c2-1' },
  //     { from: 'c2', to: 'c2-2' },
  //     { from: 'c', to: 'c3' },
  //     { from: 'c3', to: 'c3-1' },
  //     { from: 'c3', to: 'c3-2' },
  //     { from: 'c3', to: 'c3-3' },
  //     { from: 'a', to: 'd' },
  //     { from: 'd', to: 'd1' },
  //     { from: 'd1', to: 'd1-1' },
  //     { from: 'd1', to: 'd1-2' },
  //     { from: 'd1', to: 'd1-3' },
  //     { from: 'd1', to: 'd1-4' },
  //     { from: 'd1', to: 'd1-5' },
  //     { from: 'd1', to: 'd1-6' },
  //     { from: 'd1', to: 'd1-7' },
  //     { from: 'd1', to: 'd1-8' },
  //     { from: 'd', to: 'd2' },
  //     { from: 'd2', to: 'd2-1' },
  //     { from: 'd2', to: 'd2-2' },
  //     { from: 'd', to: 'd3' },
  //     { from: 'd3', to: 'd3-1' },
  //     { from: 'd3', to: 'd3-2' },
  //     { from: 'd3', to: 'd3-3' },
  //     { from: 'd3', to: 'd3-4' },
  //     { from: 'd3', to: 'd3-5' },
  //     { from: 'd', to: 'd4' },
  //     { from: 'd4', to: 'd4-1' },
  //     { from: 'd4', to: 'd4-2' },
  //     { from: 'd4', to: 'd4-3' },
  //     { from: 'd4', to: 'd4-4' },
  //     { from: 'd4', to: 'd4-5' },
  //     { from: 'd4', to: 'd4-6' },
  //     { from: 'a', to: 'e' },
  //     { from: 'e', to: 'e1' },
  //     { from: 'e1', to: 'e1-1' },
  //     { from: 'e1', to: 'e1-2' },
  //     { from: 'e1', to: 'e1-3' },
  //     { from: 'e1', to: 'e1-4' },
  //     { from: 'e1', to: 'e1-5' },
  //     { from: 'e1', to: 'e1-6' },
  //     { from: 'e', to: 'e2' },
  //     { from: 'e2', to: 'e2-1' },
  //     { from: 'e2', to: 'e2-2' },
  //     { from: 'e2', to: 'e2-3' },
  //     { from: 'e2', to: 'e2-4' },
  //     { from: 'e2', to: 'e2-5' },
  //     { from: 'e2', to: 'e2-6' },
  //     { from: 'e2', to: 'e2-7' },
  //     { from: 'e2', to: 'e2-8' },
  //     { from: 'e2', to: 'e2-9' },
  //   ],
  // }
  const { nodes: dataNodes, edges: dataEdges } = demoData
  const staticJsonData = {
    rootId: '1',
    nodes: dataNodes.map((item) => {
      return {
        ...item,
        text: item.id,
      }
    }),
    lines: dataEdges.map((item) => {
      return {
        from: item.source,
        to: item.target,
        ...item,
      }
    }),
  }

  // 排序与计算位置
  // const setNodesLevel = (data: any) => {
  //   let drawNodes = []
  //   const { rootId, nodes, lines } = data
  //   const rootNode = nodes?.find((node: any) => node.id === rootId)
  //   rootNode.level = 0

  //   if (rootNode) {
  //     drawNodes.push([rootNode])
  //     const sortList = setNodesSorting(nodes, lines, drawNodes, 1)

  //     if (sortList) {
  //       // sortList.reverse().forEach((list: any, lIndex: number) => {
  //       //   list.forEach((node: any, nIndex: number) => {
  //       //     const {
  //       //       width: itemWidth,
  //       //       height: itemHeight,
  //       //       paddingX,
  //       //       paddingY,
  //       //     } = nodeConfig
  //       //     const { width: canvasWidth, height: canvasHeight } = canvasConfig
  //       //     const nodeX = (itemWidth + paddingX) * nIndex
  //       //     const nodeY =
  //       //       (itemHeight + paddingY) * (sortList.length - lIndex - 1)
  //       //     const offsetX =
  //       //       canvasWidth / 2 - ((itemWidth + paddingX) * list.length) / 2
  //       //     const offsetY =
  //       //       canvasHeight / 2 - ((itemHeight + paddingY) * sortList.length) / 2
  //       //     const currentNode = nodes.find((cNode: any) => cNode.id === node.id)
  //       //     currentNode.x = nodeX + offsetX + paddingX / 2
  //       //     currentNode.y = nodeY + offsetY + paddingY / 2
  //       //     currentNode.width = itemWidth
  //       //     currentNode.height = itemHeight
  //       //     currentNode.paddingX = paddingX
  //       //     currentNode.paddingY = paddingY

  //       //     const lastSortList = sortList[lIndex - 1]
  //       //     if (lastSortList) {
  //       //       const lastNodes = lastSortList.filter(
  //       //         (n: any) => n.parentId === node.id
  //       //       )
  //       //       if (lastNodes.length > 0) {
  //       //         const currentX =
  //       //           (lastNodes[lastNodes.length - 1].x + lastNodes[0].x) / 2

  //       //         currentNode.x = currentX
  //       //       } else {
  //       //         currentNode.x = nodeX + offsetX + paddingX / 2
  //       //       }
  //       //     } else {
  //       //       currentNode.x = nodeX + offsetX + paddingX / 2
  //       //     }
  //       //   })
  //       // })
  //       sortList.forEach((list: any, lIndex: number) => {
  //         list.forEach((node: any, nIndex: number) => {
  //           const {
  //             width: itemWidth,
  //             height: itemHeight,
  //             paddingX,
  //             paddingY,
  //           } = nodeConfig
  //           const { width: canvasWidth, height: canvasHeight } = canvasConfig
  //           const nodeX = (itemWidth + paddingX) * nIndex
  //           const nodeY = (itemHeight + paddingY) * lIndex
  //           const offsetX =
  //             canvasWidth / 2 - ((itemWidth + paddingX) * list.length) / 2
  //           const offsetY =
  //             canvasHeight / 2 - ((itemHeight + paddingY) * sortList.length) / 2
  //           const currentNode = nodes.find((cNode: any) => cNode.id === node.id)

  //           currentNode.x = nodeX
  //           currentNode.y = nodeY
  //           currentNode.width = itemWidth
  //           currentNode.height = itemHeight
  //           currentNode.paddingX = paddingX
  //           currentNode.paddingY = paddingY
  //         })
  //       })
  //     }
  //   }
  // }
  let sortCount: number, sortLevel: number
  const setNodesLevel = (data: any) => {
    const { rootId, nodes, lines } = data
    const rootNode = { ...nodes.find((n: any) => n.id === rootId) }
    let drawNodes = []
    if (rootNode) {
      rootNode.level = 0
      sortCount = -1
      sortLevel = 0
      drawNodes.push([{ ...rootNode }])
      const nodesTree = getNodesTree(rootNode, nodes, lines)
      const sortList = setNodesSorting(nodes, lines, drawNodes, 1)
      let offsetMark = [0, 0, 0, 0]
      sortList.reverse().forEach((list: any, lIndex: number) => {
        let centerMark = [0, 0]
        list.forEach((node: any, nIndex: number) => {
          const currentNode = nodes.find((cNode: any) => cNode.id === node.id)
          const currentParentNode = nodes.find(
            (n: any) => n.id === node.parentId
          )

          const lastListNode = list[nIndex - 1]
          const nextListNode = list[nIndex + 1]
          if (!lastListNode || lastListNode.parentId !== node.parentId) {
            centerMark[0] = currentNode.x
          }

          if (!nextListNode || nextListNode.parentId !== node.parentId) {
            centerMark[1] = currentNode.x

            if (currentParentNode) {
              currentParentNode.x = (centerMark[1] + centerMark[0]) / 2
              centerMark = [0, 0]
            }
          }

          if (currentNode.x <= offsetMark[0]) {
            offsetMark[0] = currentNode.x
          }

          if (currentNode.x + currentNode.width > offsetMark[1]) {
            offsetMark[1] = currentNode.x + currentNode.width
          }

          if (currentNode.y <= offsetMark[2]) {
            offsetMark[2] = currentNode.y
          }

          if (currentNode.y + currentNode.height > offsetMark[3]) {
            offsetMark[3] = currentNode.y + currentNode.height
          }
        })
      })

      const treeWidth = offsetMark[1] - offsetMark[0]
      const treeHeight = offsetMark[3] - offsetMark[2]
      const { width: canvasWidth, height: canvasHeight } = canvasConfig
      const offsetX = (canvasWidth - treeWidth) / 2
      const offsetY = (canvasHeight - treeHeight) / 2
      nodes.map((node: any) => {
        node.x = node.x + offsetX
        node.y = node.y + offsetY
        return node
      })
    }
  }

  // 重新排序
  const setNodesSorting: any = (
    nodes: any,
    lines: any,
    nodesList: any,
    level: number
  ) => {
    const lastNodes = nodesList[level - 1]
    let currentNodes: any[] = []
    if (lastNodes) {
      lastNodes.forEach((node: any) => {
        lines.forEach((line: any) => {
          if (line.from === node.id) {
            const currentNode = {
              ...nodes.find((node: any) => node.id === line.to),
            }

            if (currentNode) {
              currentNode.level = level
              currentNode.parentId = node.id
              currentNodes.push(currentNode)
            }
          }
        })
      })
      if (currentNodes.length > 0) {
        nodesList.push(currentNodes)
        return setNodesSorting(nodes, lines, nodesList, level + 1)
      }
      return nodesList
    }
  }

  // 获取树结构数据第一次定位
  const getNodesTree: any = (node: any, nodes: any, lines: any) => {
    const children: any = []
    const childrenLines = lines.filter((line: any) => line.from === node.id)
    if (node.level <= sortLevel) {
      sortCount++
    }
    sortLevel = node.level
    node.crossLevel = sortCount

    const {
      width: itemWidth,
      height: itemHeight,
      paddingX,
      paddingY,
    } = nodeConfig
    const nodeX = (itemWidth + paddingX) * node.crossLevel
    const nodeY = (itemHeight + paddingY) * node.level

    const currentNode = nodes.find((cNode: any) => cNode.id === node.id)
    currentNode.x = nodeX
    currentNode.y = nodeY
    currentNode.width = itemWidth
    currentNode.height = itemHeight
    currentNode.paddingX = paddingX
    currentNode.paddingY = paddingY

    childrenLines.forEach((line: any) => {
      const currentNode = { ...nodes.find((n: any) => n.id === line.to) }
      if (currentNode) {
        currentNode.level = node.level + 1
        currentNode.parentId = node.id
        children.push(currentNode)
      }
    })
    node.children = children.map((cNode: any) => {
      return getNodesTree(cNode, nodes, lines)
    })
    return node
  }
  // 画框
  const drawDept = (ctx: any, config: any) => {
    // 画框
    ctx.fillStyle = config.fillStyle
    ctx.fillRect(config.x, config.y, config.width, config.height)

    // 画边框
    ctx.lineWidth = 1
    ctx.strokeStyle = '#222'
    ctx.strokeRect(config.x, config.y, config.width, config.height)
  }

  // 画字
  const drawText = (ctx: any, config: any) => {
    // 画文字
    const { width: textWidth, actualBoundingBoxAscent: textHeight } =
      ctx.measureText(config.text)
    const textX = config.x + (config.width - textWidth) / 2
    const textY = config.y + (config.height + textHeight) / 2
    ctx.fillStyle = '#000'
    ctx.font = '14px Arial'
    ctx.fillText(config.text, textX, textY)
  }

  // 画线
  const drawLine = (ctx: any, config: any) => {
    const { paddingY } = nodeConfig
    ctx.lineWidth = 1
    ctx.strokeStyle = config.strokeStyle
    ctx.beginPath()
    ctx.moveTo(config.fromX, config.fromY)
    ctx.lineTo(config.fromX, config.fromY + paddingY / 2)
    ctx.lineTo(config.toX, config.fromY + paddingY / 2)
    ctx.lineTo(config.toX, config.toY)
    ctx.stroke()
    ctx.closePath()
  }

  // 画组织图
  const draw = () => {
    const canvas = refGraphCanvas.current
    if (canvas) {
      const ctx: any = canvas.getContext('2d')
      canvasCtx.current = ctx

      const { nodes, lines } = staticJsonData
      nodes.forEach((node: any) => {
        const config = {
          ...node,
          fillStyle: '#fff',
        }
        drawDept(ctx, config)
        drawText(ctx, config)
      })
      lines.forEach((line: any) => {
        const { from, to } = line
        const fNode: any = nodes.find((item: any) => item.id === from)
        const tNode: any = nodes.find((item: any) => item.id === to)
        const config = {
          ...line,
          fromX: fNode.x + fNode.width / 2,
          fromY: fNode.y + fNode.height,
          toX: tNode.x + tNode.width / 2,
          toY: tNode.y,
          strokeStyle: '#000',
        }
        drawLine(ctx, config)
      })
    }
  }

  // 鼠标点击
  const onCanvasMouseDown = (e: any) => {
    if (e.button === 0) {
      // 点击了鼠标左键
      mousePosition.current.x = e.x
      mousePosition.current.y = e.y
      window.addEventListener('mousemove', onCanvasMouseMove)
      window.addEventListener('mouseup', onCanvasMouseUp)
    }
  }

  // 鼠标平移
  const onCanvasMouseMove = (e: any) => {
    mousePosition.offset.x =
      mousePosition.last.x + (e.x - mousePosition.current.x)
    mousePosition.offset.y =
      mousePosition.last.y + (e.y - mousePosition.current.y)

    paint()
  }

  // 鼠标抬起
  const onCanvasMouseUp = (e: any) => {
    mousePosition.last.x = mousePosition.offset.x
    mousePosition.last.y = mousePosition.offset.y
    window.removeEventListener('mousemove', onCanvasMouseMove)
    window.removeEventListener('mouseup', onCanvasMouseUp)
  }

  // 鼠标缩放
  const onCanvasMousewheel = (e: any) => {
    e.preventDefault()
    mousePosition.current.x = e.offsetX
    mousePosition.current.y = e.offsetY

    if (e.wheelDelta > 0) {
      // 放大
      canvasScale.scale = parseFloat(
        (canvasScale.scaleStep + canvasScale.scale).toFixed(2)
      ) // 解决小数点运算丢失精度的问题
      if (canvasScale.scale > canvasScale.maxScale) {
        canvasScale.scale = canvasScale.maxScale
        return
      }
    } else {
      // 缩小
      canvasScale.scale = parseFloat(
        (canvasScale.scale - canvasScale.scaleStep).toFixed(2)
      ) // 解决小数点运算丢失精度的问题
      if (canvasScale.scale < canvasScale.minScale) {
        canvasScale.scale = canvasScale.minScale
        return
      }
    }
    zoom()
  }

  // 画布缩放
  const zoom = () => {
    mousePosition.offset.x =
      canvasScale.mousePosition.x -
      ((canvasScale.mousePosition.x - mousePosition.offset.x) *
        canvasScale.scale) /
        canvasScale.preScale
    mousePosition.offset.y =
      canvasScale.mousePosition.y -
      ((canvasScale.mousePosition.y - mousePosition.offset.y) *
        canvasScale.scale) /
        canvasScale.preScale

    paint()
    canvasScale.preScale = canvasScale.scale
    mousePosition.last.x = mousePosition.offset.x
    mousePosition.last.y = mousePosition.offset.y
  }

  // 清空画布
  const clear = () => {
    const canvas = refGraphCanvas.current
    if (canvas) {
      canvas.width = canvasConfig.width
    }
  }

  // 重绘
  const paint = () => {
    const canvas = refGraphCanvas.current

    if (canvas) {
      clear()
      const ctx: any = canvas.getContext('2d')
      ctx.translate(mousePosition.offset.x, mousePosition.offset.y)
      ctx.scale(canvasScale.scale, canvasScale.scale)
      draw()
    }
  }

  // 初始化缩放
  // const zoomInit = (scale: number = 1) => {
  //   canvasScale.scale = scale
  //   if (canvasScale.scale > canvasScale.maxScale) {
  //     canvasScale.scale = canvasScale.maxScale
  //     return
  //   }
  //   canvasScale.mousePosition.x = canvasConfig.width / 2
  //   canvasScale.mousePosition.y = canvasConfig.height / 2
  //   zoom()
  // }

  useEffect(() => {
    const canvas = refGraphCanvas.current
    if (canvas) {
      setNodesLevel(staticJsonData)
      console.log(staticJsonData)

      draw()
      // zoomInit(0.5)
      canvas.addEventListener('mousewheel', onCanvasMousewheel)
      canvas.addEventListener('mousedown', onCanvasMouseDown)
    }
  })

  return (
    <canvas
      ref={refGraphCanvas}
      id="canvas"
      className="graph-canvas"
      width={canvasConfig.width}
      height={canvasConfig.height}
    ></canvas>
  )
}

export default Demo
