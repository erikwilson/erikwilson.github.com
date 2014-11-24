
all: $(patsubst %.tex, %.pdf, $(wildcard *.tex))

%.pdf: %.tex
	latex $< && dvips $*.dvi && ps2pdf $*.ps

clean:
	rm -f *.aux *.dvi *.log *.out *.ps *.pdf

serve:
	resume serve
