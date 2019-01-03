import Parser, { dependencyParser } from "./parser";

const source = `
Package: python-pkg-resources
Status: install ok installed
Priority: optional
Section: python
Installed-Size: 175
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Source: distribute
Version: 0.6.24-1ubuntu1
Replaces: python2.3-setuptools, python2.4-setuptools
Provides: python2.6-setuptools, python2.7-setuptools
Depends: python (>= 2.6), python (<< 2.8)
Suggests: python-distribute, python-distribute-doc
Conflicts: python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)
Description: Package Discovery and Resource Access using pkg_resources
 The pkg_resources module provides an API for Python libraries to
 access their resource files, and for extensible applications and
 frameworks to automatically discover plugins.  It also provides
 runtime support for using C extensions that are inside zipfile-format
 eggs, support for merging packages that have separately-distributed
 modules or subpackages, and APIs for managing Python's current
 "working set" of active packages.
Original-Maintainer: Matthias Klose <doko@debian.org>
Homepage: http://packages.python.org/distribute
Python-Version: 2.6, 2.7

Package: tcpd
Status: install ok installed
Multi-Arch: foreign
Priority: optional
Section: net
Installed-Size: 132
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: tcp-wrappers
Version: 7.6.q-21
Replaces: libwrap0 (<< 7.6-8)
Depends: libc6 (>= 2.4), libwrap0 (>= 7.6-4~)
Description: Wietse Venema's TCP wrapper utilities
 Wietse Venema's network logger, also known as TCPD or LOG_TCP.
 .
 These programs log the client host name of incoming telnet,
 ftp, rsh, rlogin, finger etc. requests.
 .
 Security options are:
  - access control per host, domain and/or service;
  - detection of host name spoofing or host address spoofing;
  - booby traps to implement an early-warning system.
Original-Maintainer: Marco d'Itri <md@linux.it>

Package: libws-commons-util-java
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 101
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 1.0.1-7
Description: Common utilities from the Apache Web Services Project
 This is a small collection of utility classes, that allow high
 performance XML processing based on SAX.
Original-Maintainer: Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>
Homepage: http://ws.apache.org/commons/util/
`;

it("parses source without errors", () => {
  const data = new Parser().parse(source);

  expect(data.packages[0].package.value).toBe("libws-commons-util-java");
  expect(data.packages[1].depends.value[0]).toBe("python");
  expect(data.packages[2].description.value).toBe(
    `Wietse Venema's TCP wrapper utilities
 Wietse Venema's network logger, also known as TCPD or LOG_TCP.
 .
 These programs log the client host name of incoming telnet,
 ftp, rsh, rlogin, finger etc. requests.
 .
 Security options are:
  - access control per host, domain and/or service;
  - detection of host name spoofing or host address spoofing;
  - booby traps to implement an early-warning system.`
  );
});

it("depends field is parsed without errors", () => {
  const value = dependencyParser(
    "junit (>= 3.8.2), libplexus-cipher-java, libplexus-container-default-java, libplexus-utils-java"
  );
  expect(value[0]).toBe("junit");
  expect(value[1]).toBe("libplexus-cipher-java");
  expect(value[2]).toBe("libplexus-container-default-java");
  expect(value[3]).toBe("libplexus-utils-java");
});
