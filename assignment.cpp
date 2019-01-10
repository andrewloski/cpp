#include<cstring>
#include<cstdio>
class cs {
  public:
    cs(char * s = nullptr);
    cs(const cs& s);
    ~cs(void);
    cs& operator = (const cs& s);
    void print();
  private:
    char* s;
};
cs::cs(char* s) {
  if(s == nullptr) {
    this -> s = new char[1];
    this -> s[0] = '\0';
  }
  else {
    this -> s = new char[strlen(s) + 1];
    strcpy(this -> s, s);
  }
}
cs::cs(const cs& s) {
  this -> s = new char[strlen(s.s) + 1];
  strcpy(this -> s, s.s);
}
cs::~cs(){
  delete[] s;
}
cs& cs::operator = (const cs& s) {
    if(this != &s) {
      cs str(s);
      char* p = str.s;
      str.s = this -> s;
      this -> s = p;
    }
    return *this;
}
void cs::print() {
  printf("%s\n", s);
}
void assignment() {
    cs s1("assignment");
    cs s2;
    s2 = s1;
    s2.print();
}
void continuous() {
  cs s1("continuous");
  cs s2, s3;
  s3 = s2 = s1;
  s1.print();
  s2.print();
  s3.print();
}
void assignmentToSelf() {
  cs s("assignment to self");
  s = s;
  s.print();
}
int main() {
  assignment();
  continuous();
  assignmentToSelf();
  return 0;
}
