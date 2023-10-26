from urllib.request import Request, urlopen

url = "https://www.applebees.com/en/nutrition/info"
page = urlopen(url)


html_bytes = page.read()
html = html_bytes.decode("utf-8")

f = open("parsedAppleBee.txt", "w")
f.write(html)
f.close()
