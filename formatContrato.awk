BEGIN{FS=":"; flag=0;}
$1 ~/\s*\"Tipo\(s\) de Contrato\"/     {flag=1;}
{if(!flag) print $0;
 else {
	 print $1 " : [" $2 "],"}}
END{}
