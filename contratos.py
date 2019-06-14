#!/usr/bin/python3
import regex as re
import sys, getopt

ops,args = getopt.getopt(sys.argv[1:], "")
ops = dict(ops) 

def removeCommas (text):
    return re.sub("\",]","\"]",text)

def switchBr (text) :
    return re.sub(r"<br/>","\",\"",text)

def removeTabs (text):
    text = re.sub("\\t"," ",text)
    return re.sub("\t"," ",text)

def removeAspas (text):
    return re.sub('"','',text)

def main (args, opts):
    text = open(args[0]).read()
    text = removeCommas(text)
    text = switchBr(text)
    text = removeTabs(text)
    print (text)

main(args,ops)
