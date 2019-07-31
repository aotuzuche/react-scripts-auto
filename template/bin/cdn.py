import os
import sys


def main():
    env = open(os.path.abspath('.env'), 'r')
    isTest = len(sys.argv) > 1 and sys.argv[1] == 'test'
    data = env.read()
    if isTest:
        data = data.replace('cdn.atzuche.com', 'cdn-test.atzuche.com')
    else:
        data = data.replace('cdn-test.atzuche.com', 'cdn.atzuche.com')

    envw = open(os.path.abspath('.env'), 'w')
    envw.write(data)


if __name__ == '__main__':
    main()
