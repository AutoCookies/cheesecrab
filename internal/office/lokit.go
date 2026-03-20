package office

/*
#define LOK_USE_UNSTABLE_API
#include <LibreOfficeKit/LibreOfficeKitInit.h>
#include <LibreOfficeKit/LibreOfficeKit.h>
#include <stdlib.h>

static void lok_office_destroy_wrapper(LibreOfficeKit* pOffice) {
    pOffice->pClass->destroy(pOffice);
}

static LibreOfficeKitDocument* lok_office_document_load_wrapper(LibreOfficeKit* pOffice, const char* pURL) {
    return pOffice->pClass->documentLoad(pOffice, pURL);
}

static void lok_document_destroy_wrapper(LibreOfficeKitDocument* pDoc) {
    pDoc->pClass->destroy(pDoc);
}
*/
import "C"
import (
	"fmt"
	"unsafe"
)

// Office represents a LibreOfficeKit instance.
type Office struct {
	lok *C.LibreOfficeKit
}

// Initialize loads the LibreOfficeKit library from the given path.
func Initialize(path string) (*Office, error) {
	cPath := C.CString(path)
	defer C.free(unsafe.Pointer(cPath))

	lok := C.lok_init(cPath)
	if lok == nil {
		return nil, fmt.Errorf("failed to initialize LibreOfficeKit at %s", path)
	}

	return &Office{lok: lok}, nil
}

// Close releases the LibreOfficeKit instance.
func (o *Office) Close() {
	if o.lok != nil {
		C.lok_office_destroy_wrapper(o.lok)
		o.lok = nil
	}
}

// Document represents an open document in LibreOfficeKit.
type Document struct {
	doc *C.LibreOfficeKitDocument
}

// LoadDocument opens a document from the given path.
func (o *Office) LoadDocument(path string) (*Document, error) {
	cPath := C.CString(path)
	defer C.free(unsafe.Pointer(cPath))

	doc := C.lok_office_document_load_wrapper(o.lok, cPath)
	if doc == nil {
		return nil, fmt.Errorf("failed to load document: %s", path)
	}

	return &Document{doc: doc}, nil
}

// Close releases the document handle.
func (d *Document) Close() {
	if d.doc != nil {
		C.lok_document_destroy_wrapper(d.doc)
		d.doc = nil
	}
}
