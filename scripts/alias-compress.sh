# Hugo 博客图片压缩工具快捷命令
# 使用方法：在终端中输入以下命令添加到你的 ~/.zshrc

# 方法1: 添加别名(推荐)
alias compress-img='~/Documents/github/Lillian/scripts/compress-image.sh'

# 方法2: 添加函数(更灵活)
compress-blog-img() {
    ~/Documents/github/Lillian/scripts/compress-image.sh "$@"
}

# 使用示例:
# compress-img photo.jpg                    # 压缩为 feature.jpg
# compress-img photo.jpg cover.jpg          # 压缩为 cover.jpg
# compress-img photo.jpg cover.jpg 70       # 质量70
# compress-img photo.jpg cover.jpg 70 1600  # 质量70，最大1600px
