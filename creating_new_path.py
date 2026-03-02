import os 
import sys
i = input("write the number of the file : p_")
def check_existing(path):

    if os.path.exists(path):
        return True
    else:
        return False
while True:

    if check_existing(f"js\p_{i}"):
        if check_existing(f"js\p_{i}\js\script.js"):
            if check_existing(f"js\p_{i}\index.html"):
                if check_existing(f"js\p_{i}\css\style.css"):
                    print("already done")
                    break
    else:
        os.mkdir(f"js\p_{i}")
        os.mkdir(f"js\p_{i}\js")
        os.mkdir(f"js\p_{i}\css")
        html_path = os.path.join(f"js\p_{i}" , "index.html")
        js_path = os.path.join(f"js\p_{i}\js" , "script.js")
        css_path = os.path.join(f"js\p_{i}\css" , "style.css")
        with open(html_path , "w") as file:
            file.write("""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    

    <script src="js/script.js"></script>
</body>
</html>""")
        with open(js_path , "w") as js_file:
            js_file.write("")
        with open(css_path , "w") as css_file:
            css_file.write("""
            * {
                margin : 0;
                padding : 0;
            }""")
        break

        