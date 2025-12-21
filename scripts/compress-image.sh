#!/bin/bash

# 图片压缩工具
# 用法: ./compress-image.sh <输入图片> [输出文件名] [质量] [最大尺寸]
# 示例: ./compress-image.sh image.jpg feature.jpg 60 1200

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 默认参数
DEFAULT_QUALITY=60
DEFAULT_MAX_SIZE=1200
DEFAULT_OUTPUT="feature.jpg"

# 显示帮助信息
show_help() {
    echo "图片压缩工具 - 使用 macOS sips 命令压缩图片"
    echo ""
    echo "用法:"
    echo "  $0 <输入图片> [输出文件名] [质量] [最大尺寸]"
    echo ""
    echo "参数:"
    echo "  输入图片       必需，原始图片路径"
    echo "  输出文件名     可选，默认: feature.jpg"
    echo "  质量          可选，JPEG质量 1-100，默认: 60"
    echo "  最大尺寸       可选，图片最长边像素，默认: 1200"
    echo ""
    echo "示例:"
    echo "  $0 photo.jpg                    # 压缩为 feature.jpg，质量60，最大1200px"
    echo "  $0 photo.jpg cover.jpg          # 压缩为 cover.jpg，质量60"
    echo "  $0 photo.jpg cover.jpg 80       # 压缩为 cover.jpg，质量80"
    echo "  $0 photo.jpg cover.jpg 80 1600  # 压缩为 cover.jpg，质量80，最大1600px"
    echo ""
    echo "质量建议:"
    echo "  90-100  高质量，文件较大"
    echo "  70-80   中等质量，平衡文件大小"
    echo "  50-60   压缩优先，文件较小（推荐博客使用）"
    echo "  30-40   高压缩，质量明显下降"
}

# 检查参数
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    show_help
    exit 0
fi

# 获取参数
INPUT_FILE="$1"
OUTPUT_FILE="${2:-$DEFAULT_OUTPUT}"
QUALITY="${3:-$DEFAULT_QUALITY}"
MAX_SIZE="${4:-$DEFAULT_MAX_SIZE}"

# 验证输入文件
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}错误: 找不到文件 '$INPUT_FILE'${NC}"
    exit 1
fi

# 验证质量参数
if ! [[ "$QUALITY" =~ ^[0-9]+$ ]] || [ "$QUALITY" -lt 1 ] || [ "$QUALITY" -gt 100 ]; then
    echo -e "${RED}错误: 质量必须是 1-100 之间的数字${NC}"
    exit 1
fi

# 验证尺寸参数
if ! [[ "$MAX_SIZE" =~ ^[0-9]+$ ]] || [ "$MAX_SIZE" -lt 100 ]; then
    echo -e "${RED}错误: 最大尺寸必须是大于100的数字${NC}"
    exit 1
fi

# 获取原始文件信息
ORIGINAL_SIZE=$(stat -f%z "$INPUT_FILE")
ORIGINAL_SIZE_KB=$((ORIGINAL_SIZE / 1024))

echo -e "${YELLOW}开始压缩图片...${NC}"
echo "输入文件: $INPUT_FILE"
echo "输出文件: $OUTPUT_FILE"
echo "原始大小: ${ORIGINAL_SIZE_KB}KB"
echo "压缩质量: $QUALITY"
echo "最大尺寸: ${MAX_SIZE}px"
echo ""

# 执行压缩
sips -Z "$MAX_SIZE" -s format jpeg -s formatOptions "$QUALITY" "$INPUT_FILE" --out "$OUTPUT_FILE" > /dev/null 2>&1

# 检查是否成功
if [ $? -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
    # 获取压缩后文件信息
    OUTPUT_SIZE=$(stat -f%z "$OUTPUT_FILE")
    OUTPUT_SIZE_KB=$((OUTPUT_SIZE / 1024))
    
    # 计算压缩比
    COMPRESSION_RATIO=$(awk "BEGIN {printf \"%.1f\", (1 - $OUTPUT_SIZE / $ORIGINAL_SIZE) * 100}")
    
    echo -e "${GREEN}✓ 压缩成功!${NC}"
    echo "压缩后大小: ${OUTPUT_SIZE_KB}KB"
    echo "压缩比例: ${COMPRESSION_RATIO}%"
    echo ""
    
    # 大小建议
    if [ "$OUTPUT_SIZE_KB" -gt 200 ]; then
        echo -e "${YELLOW}⚠ 提示: 文件大小 ${OUTPUT_SIZE_KB}KB 超过200KB，可能影响加载速度${NC}"
        echo -e "${YELLOW}   建议: 降低质量参数或减小尺寸${NC}"
        echo -e "${YELLOW}   示例: $0 $INPUT_FILE $OUTPUT_FILE 50 1000${NC}"
    elif [ "$OUTPUT_SIZE_KB" -lt 50 ]; then
        echo -e "${YELLOW}⚠ 提示: 文件大小 ${OUTPUT_SIZE_KB}KB 可能质量较低${NC}"
        echo -e "${YELLOW}   建议: 可以适当提高质量参数${NC}"
        echo -e "${YELLOW}   示例: $0 $INPUT_FILE $OUTPUT_FILE 70${NC}"
    else
        echo -e "${GREEN}✓ 文件大小合适，适合博客使用${NC}"
    fi
else
    echo -e "${RED}✗ 压缩失败${NC}"
    exit 1
fi
