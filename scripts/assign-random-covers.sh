#!/bin/bash

# 为没有封面的文章随机分配本地封面图片

COVERS_DIR="static/images/covers"
POSTS_DIR="content/posts"

# 获取所有封面图片
covers=($(ls $COVERS_DIR/*.{jpg,png} 2>/dev/null))
cover_count=${#covers[@]}

if [ $cover_count -eq 0 ]; then
    echo "错误: $COVERS_DIR 目录中没有找到封面图片"
    exit 1
fi

echo "找到 $cover_count 张封面图片"

# 遍历所有文章
for post_dir in $POSTS_DIR/*/; do
    index_file="${post_dir}index.md"
    
    if [ -f "$index_file" ]; then
        # 检查是否已有 feature 配置
        if ! grep -q "^feature:" "$index_file"; then
            # 随机选择一张封面
            random_index=$((RANDOM % cover_count))
            cover_file="${covers[$random_index]}"
            cover_name=$(basename "$cover_file")
            
            # 在 --- 结束标记前插入 feature 配置
            sed -i '' '/^---$/,/^---$/ { /^---$/! { /^---$/! { /^$/! s/^---$/feature: \/images\/covers\/'$cover_name'\n---/; } } }' "$index_file"
            
            echo "✓ 为 $(basename $post_dir) 分配封面: $cover_name"
        else
            echo "- $(basename $post_dir) 已有封面,跳过"
        fi
    fi
done

echo "完成!"
