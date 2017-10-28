# Claims-summary-builder
Chrome plugin for Kiev Claims team of Kiwi.com
!!!WARNING!!!
BETTER RECHECK INFORMATION ABOUT CANCELLATION/ASSESSMENT VIA MMB WITH EXPERIENCED AGENTS FIRST

First of all I'll show on example how does it works:

sa-aa-bc-va-hfy-my->Norwe,aa->Vuel,aa-<kt

Enter this text in plugins textarea field and push TAB button at the end of this row. Then you will see this:

Summary above
- pap filled RAF on assess amount/booking card
- voluntary assessment (affected flights)
- HF applied, Margin can be added (flights in future + cancellable) => /value/
________________
**DONE**
- /Route - PNR/
called Norwe. Cancellable & Possible RA in case of cancellation/no-show - 
- /Route - PNR/
called Vuel. NC & Possible RA in case of no-show - 

**TO DO**
- **Kiev Team**
pls



Excited? Let's move forward for more detailed view



1. I call this Head part of summary (everything above DONE section).
There is a list of short commands that you need to know (Please watch addition № 1 for this list). You can combine them with - between it.

For example:
s-pr-bc-gc-hfn-mn

After pushing Tab button will look like

**SUMMARY**
- pap filled RAF on proceed/booking card
- guarantee (/route/ cancelled by a/l)
- HF not applied, no Margin
- pap's comment to RAF:
 **
 
 2. DONE section
 A little bit easier here. You need to write down a/l's name (long or short but not IATA) Symbols -> before each of them and 
 short name of Action you need to do with this a/l separated with coma with a/l's name.

Example:

->Norwe,aa->Vuel,c->Cobalt,fl

Output after Tab:

________________
**DONE**
- /Route - PNR/
called Norwe. Cancellable & Possible RA in case of cancellation/no-show - 
- /Route - PNR/
According Vuel rules NC & only taxes after dep. can be requested
- /Route - PNR/
flown. Called Cobalt. Applied for TR. RA of   wil be refunded withing  wd

Short names of Actions here:
aa - assess amount;
c - cancellation;
fl - requesting TR after dep. for flown flights

3. TO DO section
there is also a short list of commands (see Addition № 2 ).
Here you should mention kiwi's department abbraviations and add -< at the beggining of each of them

Example:

-<kt-<gds-<cs

Output after pushing of Tab button:


**TO DO**
- **Kiev Team**
pls
- **GDS**
pls
- **CS**
pls

Also I would like to admit than all instructions are not case sensetive
so Norwe is the same as NORWE of norwe

This is my last gift for ya )). Thank you ladies and gentlemans for all time that I've spend with you. It was very fun )). 
Special thanks for Christina Zhurina. You've learned me how to work hard and qualitatively. You da best Claims ever :-)
Don't forget to look for additions at the end ))

Best regards,
Joshua '50Djents' Travis

Addition № 1 (for Head section)
s: SUMMARY;
sa: Summary above
trfc: Tax refund (flight change) (try this on plugin ))))
pr: proceed;
aa: assess amount
bc: booking card            
pay: paypal
b: bank;
cr: credits
vc: voluntary cancellation
va: voluntary assessment
gc: guarantee (/route/ cancelled by a/l)
'gsc': guarantee (/route/ delayed and /routes/ affected)
g: guarantee
mi: medical issue
bi: baggage issue
ci: check-in issue
hfy: HF applied;
my: Margin can be added
mn: no Margin
hfn: HF not applied;

Addition № 2 (for TO DO section)
kt: **Kiev Team**;
bcl: **Brno Claims**
kcl: **Kiev Claims**
bo: **BO**
cs: **CS**
gds: **GDS**
avc: **AvC**
