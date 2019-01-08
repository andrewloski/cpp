#include<cstring>
#include<cstdio>
class cstring {
	public:
		cstring(char* s = nullptr);
		cstring(const cstring& s);
		~cstring(void);
		cstring& operator = (const cstring& s);
		void print();
	private:
		char * s;
};
cstring::cstring(char *s) {
	if(s == nullptr){
		this -> s = new char[1];
		this -> s[0] = '\0';
	}
	else {
		this -> s = new char[strlen(s) + 1];
		strcpy(this -> s, s);
	}
}
cstring::cstring(const cstring& s){
	this -> s = new char[strlen(s.s) + 1];
	strcpy(this -> s, s.s);
		
}
cstring::~cstring(){
	delete[] s;
}
cstring& cstring::operator = (const cstring& s){
	if(this == &s)
		return *this;
	delete[] this -> s;
	this -> s = nullptr;
	this -> s = new char[strlen(s.s) + 1];
	strcpy(this -> s, s.s);
	return *this;
}
void cstring::print(){
	printf("%s\n", s);
}
void assignment(){
	cstring s1("assignment");
	cstring s2;
	s2 = s1;
	s2.print();
}
void continuousAssignment(){
	cstring s1("continuous assignment");
	cstring s2;
	cstring s3;
	s3 = s2 = s1;
	s1.print();
	s2.print();
	s3.print();
}
void assignmentToSelf(){
	cstring s("assignment to self");
	s = s;
	s.print();
}
int main(){
	assignment();
	continuousAssignment();
	assignmentToSelf();
	return 0;
}
