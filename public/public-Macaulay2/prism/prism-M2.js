Prism.languages.macaulay2 = {
	
	'comment': [
		{
			pattern: /(^|[^\\])\-\*[\s\S]*?(?:\*\-|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\-\-.*/,
			lookbehind: true,
			greedy: true
		}
	],

        'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	}, 
'keyword': /\b(?:and|break|catch|continue|do|elapsedTime|elapsedTiming|else|for|from|global|if|in|list|local|new|not|of|or|return|shield|SPACE|step|symbol|then|threadVariable|throw|time|timing|to|try|when|while)\b/,
'class-name': /\b(?:Adjacent|AffineVariety|Analyzer|ANCHOR|Array|AssociativeExpression|Bag|BasicList|BettiTally|BinaryOperation|BLOCKQUOTE|BODY|BOLD|Boolean|BR|CacheFunction|CacheTable|CC|CDATA|ChainComplex|ChainComplexMap|CODE|CoherentSheaf|Command|COMMENT|CompiledFunction|CompiledFunctionBody|CompiledFunctionClosure|ComplexField|Constant|Database|DD|Descent|Describe|Dictionary|DIV|DIV1|Divide|DL|DocumentTag|DT|Eliminate|EM|EngineRing|Equation|ExampleItem|Expression|File|FilePosition|ForestNode|FractionField|Function|FunctionApplication|FunctionBody|FunctionClosure|GaloisField|GeneralOrderedMonoid|GlobalDictionary|GradedModule|GradedModuleMap|GroebnerBasis|GroebnerBasisOptions|HashTable|HEAD|HEADER1|HEADER2|HEADER3|HEADER4|HEADER5|HEADER6|HeaderType|Holder|HR|HREF|HTML|Hybrid|Hypertext|HypertextContainer|HypertextParagraph|Ideal|IMG|ImmutableType|IndeterminateNumber|IndexedVariable|IndexedVariableTable|InexactField|InexactFieldFamily|InexactNumber|InfiniteNumber|IntermediateMarkUpType|ITALIC|Keyword|LABEL|LATER|LI|LINK|List|LITERAL|LocalDictionary|LocalRing|LowerBound|Manipulator|MarkUpType|MarkUpTypeWithOptions|Matrix|MatrixExpression|MENU|META|MethodFunction|MethodFunctionWithOptions|Minus|Module|ModuleMap|Monoid|MonoidElement|MonomialIdeal|MutableHashTable|MutableList|MutableMatrix|Net|NetFile|NonAssociativeProduct|Nothing|Number|OneExpression|Option|OptionTable|OrderedMonoid|Package|PARA|Parenthesize|Parser|Partition|PolynomialRing|Power|PRE|Product|ProductOrder|ProjectiveHilbertPolynomial|ProjectiveVariety|Pseudocode|PushforwardComputation|QQ|QuotientRing|RealField|Resolution|Ring|RingElement|RingFamily|RingMap|RowExpression|RR|ScriptedFunctor|SelfInitializingType|Sequence|Set|SheafOfRings|SMALL|SPAN|SparseMonomialVectorExpression|SparseVectorExpression|String|STRONG|STYLE|SUB|Subscript|SUBSECTION|Sum|SumOfTwists|SUP|Superscript|Symbol|SymbolBody|TABLE|Table|Tally|Task|TD|TEX|Thing|Time|TITLE|TO|TO2|TOH|TR|TreeNode|TT|Type|UL|URL|Variety|Vector|VerticalList|VirtualTally|VisibleList|WrapperType|ZeroExpression|ZZ)\b/,
'function': /\b(?:abs|accumulate|acos|acosh|acot|addCancelTask|addDependencyTask|addEndFunction|addHook|addStartFunction|addStartTask|adjoint|agm|alarm|all|ambient|analyticSpread|ancestor|ancestors|andP|ann|annihilator|antipode|any|append|applicationDirectory|applicationDirectorySuffix|apply|applyKeys|applyPairs|applyTable|applyValues|apropos|ascii|asin|asinh|ass|assert|associatedGradedRing|associatedPrimes|atan|atan2|atEndOfFile|autoload|baseFilename|baseName|basis|beginDocumentation|benchmark|BesselJ|BesselY|betti|between|binomial|borel|cacheValue|cancelTask|capture|ceiling|centerString|chainComplex|char|characters|charAnalyzer|check|chi|class|clean|clearEcho|code|codim|coefficient|coefficientRing|coefficients|cohomology|coimage|coker|cokernel|collectGarbage|columnAdd|columnate|columnMult|columnPermute|columnRankProfile|columnSwap|combine|commandInterpreter|commonest|commonRing|comodule|complement|complete|components|compose|compositions|compress|concatenate|conductor|cone|conjugate|connectionCount|constParser|content|contract|conwayPolynomial|copy|copyDirectory|copyFile|cos|cosh|cot|cotangentSheaf|coth|cover|coverMap|cpuTime|createTask|csc|csch|currentDirectory|currentLineNumber|currentTime|deadParser|debug|debugError|decompose|deepSplice|default|degree|degreeLength|degrees|degreesMonoid|degreesRing|delete|demark|denominator|depth|describe|det|determinant|diagonalMatrix|dictionary|diff|difference|dim|directSum|disassemble|discriminant|dismiss|distinguished|divideByVariable|doc|document|drop|dual|dumpdata|eagonNorthcott|echoOff|echoOn|eigenvalues|eigenvectors|eint|elements|eliminate|End|endPackage|entries|erase|erf|erfc|error|euler|eulers|even|EXAMPLE|examples|exec|exp|expectedReesIdeal|expm1|exponents|export|exportFrom|exportMutable|expression|extend|exteriorPower|factor|Fano|fileExecutable|fileExists|fileLength|fileMode|fileReadable|fileTime|fileWritable|fillMatrix|findFiles|findHeft|findSynonyms|first|firstkey|fittingIdeal|flagLookup|flatten|flattenRing|flip|floor|fold|forceGB|fork|format|frac|fraction|frames|fromDividedPowers|fromDual|functionBody|futureParser|Gamma|gb|gbRemove|gbSnapshot|gcd|gcdCoefficients|gcdLLL|GCstats|genera|generateAssertions|generator|generators|genericMatrix|genericSkewMatrix|genericSymmetricMatrix|gens|genus|get|getc|getChangeMatrix|getenv|getGlobalSymbol|getNetFile|getNonUnit|getPrimeWithRootOfUnity|getSymbol|getWWW|GF|globalAssign|globalAssignFunction|globalAssignment|globalReleaseFunction|gradedModule|gradedModuleMap|gramm|graphIdeal|graphRing|Grassmannian|groebnerBasis|groupID|hash|hashTable|heft|height|hermite|hilbertFunction|hilbertPolynomial|hilbertSeries|hold|Hom|homogenize|homology|homomorphism|horizontalJoin|html|httpHeaders|hypertext|icFracP|icFractions|icMap|icPIdeal|ideal|idealizer|identity|image|imaginaryPart|independentSets|index|indices|inducedMap|inducesWellDefinedMap|info|infoHelp|input|insert|installAssignmentMethod|installedPackages|installHilbertFunction|installMethod|installPackage|instance|instances|integralClosure|integralClosures|integrate|intersect|intersectInP|inverse|inversePermutation|inverseSystem|irreducibleCharacteristicSeries|irreducibleDecomposition|isAffineRing|isANumber|isBorel|isCanceled|isCommutative|isConstant|isDirectory|isDirectSum|isField|isFinite|isFinitePrimeField|isFreeModule|isGlobalSymbol|isHomogeneous|isIdeal|isInfinite|isInjective|isInputFile|isIsomorphism|isLinearType|isListener|isLLL|isModule|isMonomialIdeal|isNormal|isOpen|isOutputFile|isPolynomialRing|isPrimary|isPrime|isPrimitive|isPseudoprime|isQuotientModule|isQuotientOf|isQuotientRing|isReady|isReal|isReduction|isRegularFile|isRing|isSkewCommutative|isSorted|isSquareFree|isStandardGradedPolynomialRing|isSubmodule|isSubquotient|isSubset|isSurjective|isTable|isUnit|isWellDefined|isWeylAlgebra|jacobian|jacobianDual|join|ker|kernel|kernelLLL|keys|kill|koszul|last|lcm|leadCoefficient|leadComponent|leadMonomial|leadTerm|length|letterParser|lift|liftable|limitFiles|limitProcesses|lines|linkFile|listForm|listSymbols|LLL|lngamma|load|loaddata|loadPackage|localDictionaries|localize|localRing|locate|log|log1p|lookup|lookupCount|LUdecomposition|makeDirectory|makeDocumentTag|makePackageIndex|makeS2|map|markedGB|match|mathJax|mathML|matrix|max|maxPosition|member|memoize|merge|mergePairs|method|methodOptions|methods|min|mingens|mingle|minimalBetti|minimalPresentation|minimalPrimes|minimalReduction|minimizeFilename|minors|minPosition|minPres|minus|mkdir|mod|module|modulo|monoid|monomialCurveIdeal|monomialIdeal|monomials|monomialSubideal|moveFile|multidegree|multidoc|multiplicity|mutable|mutableIdentity|mutableMatrix|needs|needsPackage|net|netList|newClass|newCoordinateSystem|newNetFile|newPackage|newRing|nextkey|nextPrime|NNParser|nonspaceAnalyzer|norm|normalCone|notImplemented|nullhomotopy|nullParser|nullSpace|number|numcols|numColumns|numerator|numeric|numgens|numRows|numrows|odd|ofClass|on|openDatabase|openDatabaseOut|openFiles|openIn|openInOut|openListener|openOut|openOutAppend|optionalSignParser|options|optP|orP|override|pack|package|packageTemplate|pad|pager|pairs|parent|part|partition|partitions|parts|pdim|peek|permanents|permutations|pfaffians|pivots|plus|poincare|poincareN|poly|position|positions|power|powermod|precision|preimage|prepend|presentation|pretty|primaryComponent|primaryDecomposition|print|printString|processID|product|profile|Proj|projectiveHilbertPolynomial|promote|protect|prune|pseudocode|pseudoRemainder|pushForward|QQParser|QRDecomposition|quotient|quotientRemainder|radical|random|randomKRationalPoint|randomMutableMatrix|rank|read|readDirectory|readlink|realPart|realpath|recursionDepth|reduceHilbert|reductionNumber|reesAlgebra|reesAlgebraIdeal|reesIdeal|regex|registerFinalizer|regularity|relations|relativizeFilename|remainder|remove|removeDirectory|removeFile|removeHook|removeLowestDimension|reorganize|replace|res|reshape|resolution|resultant|reverse|ring|ringFromFractions|roots|rotate|round|rowAdd|rowMult|rowPermute|rowRankProfile|rowSwap|rsort|run|runHooks|runLengthEncode|same|saturate|scan|scanKeys|scanLines|scanPairs|scanValues|schedule|schreyerOrder|Schubert|searchPath|sec|sech|seeParsing|select|selectInSubring|selectVariables|separate|separateRegexp|sequence|serialNumber|set|setEcho|setGroupID|setIOExclusive|setIOSynchronized|setIOUnSynchronized|setRandomSeed|setup|setupEmacs|sheaf|sheafHom|show|showHtml|showTex|simpleDocFrob|sin|singularLocus|sinh|size|size2|sleep|smithNormalForm|solve|someTerms|sort|sortColumns|source|Spec|specialFiber|specialFiberIdeal|splice|splitWWW|sqrt|stack|standardForm|standardPairs|stashValue|status|sub|sublists|submatrix|submatrixByDegrees|subquotient|subsets|substitute|substring|subtable|sum|super|support|SVD|switch|sylvesterMatrix|symbolBody|symlinkDirectory|symlinkFile|symmetricAlgebra|symmetricAlgebraIdeal|symmetricKernel|symmetricPower|synonym|SYNOPSIS|syz|syzygyScheme|table|take|tally|tan|tangentCone|tangentSheaf|tanh|target|taskResult|temporaryFileName|tensor|tensorAssociativity|terminalParser|terms|TEST|tex|texMath|times|toAbsolutePath|toCC|toDividedPowers|toDual|toExternalString|toField|toList|toLower|top|topCoefficients|topComponents|toRR|toSequence|toString|toUpper|trace|transpose|trim|truncate|truncateOutput|tutorial|ultimate|unbag|uncurry|undocumented|uniform|uninstallAllPackages|uninstallPackage|unique|unsequence|unstack|use|userSymbols|utf8|utf8check|validate|value|values|variety|vars|vector|versalEmbedding|wait|wedgeProduct|weightRange|whichGm|width|Wikipedia|wrap|xor|youngest|zero|zeta|ZZParser)\b/,
'constant': /\b(?:AbsoluteLinks|AbstractToricVarieties|AdjointIdeal|AfterEval|AfterNoPrint|AfterPrint|AlgebraicSplines|Algorithm|Alignment|AllCodimensions|allowableThreads|argument|Ascending|Authors|AuxiliaryFiles|backtrace|backupFileRegexp|Bareiss|BaseFunction|baseRings|BaseRow|BasisElementLimit|Bayer|BeforePrint|Benchmark|Bertini|BGG|BIBasis|Binary|Binomial|BinomialEdgeIdeals|Binomials|BKZ|BoijSoederberg|BooleanGB|Boxes|Browse|Bruns|cache|CacheExampleOutput|CallLimit|Caveat|Center|Certification|ChainComplexExtras|ChainComplexOperations|ChangeMatrix|CharacteristicClasses|CheckDocumentation|Chordal|Classic|clearAll|clearOutput|close|closeIn|closeOut|ClosestFit|CodimensionLimit|CoefficientRing|Cofactor|CohenEngine|CohenTopLevel|CohomCalg|commandLine|compactMatrixForm|Complement|CompleteIntersection|CompleteIntersectionResolutions|Complexes|ConductorElement|Configuration|ConformalBlocks|Consequences|Constants|ConvexInterface|ConwayPolynomials|copyright|Core|Cremona|currentFileDirectory|currentFileName|currentLayout|currentPackage|CurrentVersion|Cyclotomic|Date|dd|DebuggingMode|debuggingMode|debugLevel|Decompose|defaultPrecision|Degree|DegreeLift|DegreeLimit|DegreeMap|DegreeOrder|DegreeRank|Degrees|Dense|Density|Depth|Descending|Description|DGAlgebras|dictionaryPath|Dispatch|DivideConquer|DividedPowers|Divisor|Dmodules|docExample|docTemplate|Down|EdgeIdeals|edit|EisenbudHunekeVasconcelos|Elimination|EliminationMatrices|EllipticCurves|EllipticIntegrals|Email|Encapsulate|EncapsulateDirectory|end|endl|Engine|engineDebugLevel|EngineTests|EnumerationCurves|environment|EquivariantGB|errorDepth|EulerConstant|Example|ExampleFiles|ExampleSystems|Exclude|exit|Ext|false|FastNonminimal|fileDictionaries|fileExitHooks|FileName|FindOne|FiniteFittingIdeals|First|FirstPackage|FlatMonoid|Flexible|flush|FollowLinks|FormalGroupLaws|Format|FourierMotzkin|FourTiTwo|fpLLL|GBDegrees|gbTrace|GenerateAssertions|Generic|GenericInitialIdeal|gfanInterface|Givens|GLex|Global|GlobalAssignHook|globalAssignmentHooks|GlobalReleaseHook|GradedLieAlgebras|GraphicalModels|Graphics|Graphs|GRevLex|GroebnerWalk|GroupLex|GroupRevLex|GTZ|handleInterrupts|HardDegreeLimit|Heading|Headline|Heft|Height|help|Hermite|Hermitian|HH|hh|HigherCIOperators|HighestWeights|Hilbert|HodgeIntegrals|homeDirectory|HomePage|Homogeneous|HorizontalSpace|HyperplaneArrangements|id|IgnoreExampleErrors|ii|incomparable|Increment|indeterminate|Index|indexComponents|infinity|InfoDirSection|Inhomogeneous|Inputs|InstallPrefix|IntegralClosure|interpreterDepth|Intersection|InvariantRing|InverseMethod|Inverses|InverseSystems|Invertible|InvolutiveBases|Iterate|Jacobian|Join|Keep|KeepZeroes|Key|Kronecker|KustinMiller|lastMatch|LatticePolytopes|Layout|Left|LengthLimit|Lex|LexIdeals|Licenses|LieTypes|Limit|Linear|LinearAlgebra|lineNumber|listLocalSymbols|listUserSymbols|LLLBases|loadDepth|LoadDocumentation|loadedFiles|loadedPackages|Local|LocalRings|LongPolynomial|MakeDocumentation|MakeInfo|MakeLinks|MapleInterface|Markov|MathJax|Matroids|maxAllowableThreads|maxExponent|MaximalIdeal|MaximalRank|MaxReductionCount|MCMApproximations|minExponent|MinimalGenerators|MinimalMatrix|minimalPresentationMap|minimalPresentationMapInv|MinimalPrimes|Minimize|Miura|ModuleDeformations|MonodromySolver|Monomial|MonomialAlgebras|MonomialOrder|Monomials|MonomialSize|MultiplierIdeals|NAGtypes|Name|Nauty|NautyGraphs|NCLex|NewFromMethod|newline|NewMethod|NewOfFromMethod|NewOfMethod|nil|NoetherNormalization|NoPrint|Normaliz|NormalToricVarieties|notify|NTL|null|nullaryMethods|NumericalAlgebraicGeometry|NumericalCertification|NumericalHilbert|NumericalImplicitization|NumericalSchubertCalculus|NumericSolutions|OldPolyhedra|OldToricVectorBundles|OO|oo|ooo|oooo|OpenMath|operatorAttributes|OptionalComponentsPresent|Options|Order|order|OutputDictionary|Outputs|PackageCitations|PackageDictionary|PackageExports|PackageImports|PackagePrefix|PackageTemplate|PairLimit|PairsRemaining|Parametrization|Parsing|path|Permanents|PHCpack|PhylogeneticTrees|pi|PieriMaps|PlaneCurveSingularities|Points|Polyhedra|Polymake|Posets|Position|Postfix|PowerBound|Precision|Prefix|prefixDirectory|prefixPath|PrimaryDecomposition|PrimaryTag|PrimitiveElement|Print|printingAccuracy|printingLeadLimit|printingPrecision|printingSeparator|printingTimeLimit|printingTrailLimit|printWidth|profileSummary|Projective|Prune|PruneComplex|pruningMap|Pullback|PushForward|QthPower|QuillenSuslin|quit|Quotient|RandomCanonicalCurves|RandomComplexes|RandomCurves|RandomIdeals|RandomMonomialIdeals|RandomObjects|RandomPlaneCurves|RandomSpaceCurves|Range|RationalMaps|RationalPoints|ReactionNetworks|RealFP|RealQP|RealRR|RealXD|recursionLimit|Reduce|ReesAlgebra|ReflexivePolytopesDB|Regularity|Reload|RemakeAllDocumentation|Repository|RerunExamples|ResidualIntersections|restart|Result|Resultants|returnCode|Reverse|RevLex|Right|rootPath|rootURI|RunExamples|SchurFunctors|SchurRings|scriptCommandLine|SCSCP|SectionRing|SeeAlso|SeparateExec|Serialization|sheafExt|ShimoyamaYokoyama|showClassStructure|showStructure|showUserStructure|SimpleDoc|SimplicialComplexes|SimplicialDecomposability|SizeLimit|SkewCommutative|SLPexpressions|Sort|SortStrategy|SourceCode|SourceRing|SpectralSequences|SRdeformations|Standard|StatePolytope|stderr|stdio|StopBeforeComputation|stopIfError|StopWithMinimalGenerators|Strategy|Style|Subnodes|SubringLimit|subscript|Sugarless|superscript|SVDComplexes|SymbolicPowers|SymmetricPolynomials|Syzygies|SyzygyLimit|SyzygyMatrix|SyzygyRows|TangentCone|TateOnProducts|TensorComplexes|Test|TestIdeals|TeXmacs|Text|Threshold|Topcom|topLevelMode|Tor|TorAlgebra|Toric|ToricTopology|ToricVectorBundles|TotalPairs|TriangularSets|Tries|Triplets|Tropical|true|Truncate|TypicalValue|typicalValues|Undo|Unique|Units|Unmixed|Up|UpdateOnly|UpperTriangular|Usage|UseCachedExampleOutput|UseHilbertFunction|UserMode|UseSyzygies|Variable|VariableBaseName|Variables|VectorFields|Verbose|Verbosity|Verify|VersalDeformations|Version|version|VerticalSpace|viewHelp|Visualize|Weights|WeylAlgebra|WeylGroups|Wrap|XML)\b/,
}