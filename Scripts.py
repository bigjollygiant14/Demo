str = 'We tried list and we tried dicts also we tried Zen'
d = {}

def test(str, d):
	for word in str.split(' '):
		if word in d:
			value = d[word]
			d[word] = value + 1
		else:
			d[word] = 1
	for word, value in d.items():
		print word, value
	d.clear()

	
test(str, d)


>>> ================================ RESTART ================================
import numpy
from Bio.Seq import Seq
from Bio.Alphabet.IUPAC import unambiguous_dna


Given: The UniProt ID of a protein.
Return: A list of biological processes in which the protein is involved (biological processes are found in a subsection of the protein's "Gene Ontology" (GO) section).
>>> ================================ RESTART ================================
>>> from Bio import SwissProt
>>> from Bio import ExPASy
>>> def test(protid):
	handle = ExPASy.get_sprot_raw(protid)
	record = SwissProt.read(handle)
	returnstring = record.cross_references
	#print returnstring
	#returnstring = returnstring[8:11]
	count = 0
	for i in returnstring:
		if 'GO' in returnstring[count]:
			#print returnstring[count][2]
			protfunc = returnstring[count][2]
			#print protfunc
			if protfunc.split(':')[0] == 'P':
				print returnstring[count][2].split(':')[1]
		count = count + 1

		
>>> test('P86176')
negative regulation of interleukin-12 production
negative regulation of T cell activation
positive regulation of interleukin-10 production
>>> test('H3SRW3')
DNA recombination
DNA repair
SOS response
>>> 

>>> ================================ RESTART ================================
>>> def Count(text, pattern):
	count = len(pattern)
	n = 0
	o = 0
	while n < len(text):
		p = text[n:n+count]
		if pattern == p:
			o = o + 1
		n = n + 1
	return o

>>> Count("ACAACTATGCATACTATCGGGAACTATCCT","ACTAT")
3

>>> ================================ RESTART ================================
def Kmer(string, length):
	itNum = 0
	results = {}
	while itNum < len(string):
		value = string[itNum:itNum+length]
		if value in results:
			results[value] = results[value] + 1
		else:
			results[value] = 1
		itNum = itNum + 1
	#sort and display highest found kmer
	#for key, value in sorted(results.iteritems(), key=lambda (k,v): (v,k)):
	#	highest = "%s: %s" % (key, value)
	#return highest
	index = 0
	for each in results:
		print each
		if index = 0
			returnedValue = {each, results[each]}
			tmpval = each
		elif results[each] > returnedValue
		elif results[each] == returnedValue[tmpval]:
			returnedValue[each] = results[each]
		index = index + 1