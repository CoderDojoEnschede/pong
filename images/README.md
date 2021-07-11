Convert to webp with

```sh
for f in images/*.png; cwebp -q 90 $f -o $f.webp; end
```